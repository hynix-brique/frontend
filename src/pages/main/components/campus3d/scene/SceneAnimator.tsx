import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ANGLE_STEP } from "../constants";
import { getSkyParams } from "../data/skyData";
import { useCampus3dStore } from "../store/campus3dStore";

// 매 프레임 Vector3/Spherical 재생성을 막기 위한 모듈 스코프 싱글턴
const _snapOffset = new THREE.Vector3();
const _sph = new THREE.Spherical();

// hours=10 고정값이므로 결과도 불변 — 매 프레임 재계산 불필요
const _sky = getSkyParams(10);

export interface SceneAnimatorProps {
	warningsRef: React.MutableRefObject<THREE.Mesh[]>;
	warningMeshesRef: React.MutableRefObject<THREE.Mesh[]>;
	lightsRef: React.MutableRefObject<{
		ambient: THREE.AmbientLight | null;
		dirLight: THREE.DirectionalLight | null;
	}>;
	startTimeRef: React.MutableRefObject<number>;
}

export function SceneAnimator({
	warningsRef,
	warningMeshesRef,
	lightsRef,
	startTimeRef,
}: SceneAnimatorProps) {
	const { gl, camera } = useThree();

	useFrame(() => {
		const elapsed = Date.now() - startTimeRef.current;
		const {
			camInputFocused,
			camXEl,
			camYEl,
			camZEl,
			camDEl,
			tgtXEl,
			tgtYEl,
			tgtZEl,
			controls,
		} = useCampus3dStore.getState();

		const lights = lightsRef.current;
		if (lights.ambient) lights.ambient.intensity = _sky.ambientIntensity;
		if (lights.dirLight) {
			lights.dirLight.intensity = _sky.dirIntensity;
			lights.dirLight.color.setHex(_sky.dirColor);
		}
		gl.toneMappingExposure = _sky.exposure;

		// 경고등 점멸
		for (const mesh of warningsRef.current) {
			if (mesh.material && "emissiveIntensity" in mesh.material) {
				(mesh.material as THREE.MeshStandardMaterial).emissiveIntensity =
					Math.sin(elapsed * 0.006) > 0 ? 1.0 : 0.1;
			}
		}

		// 경고 건물 점멸
		for (const mesh of warningMeshesRef.current) {
			if (!mesh.material || !("emissiveIntensity" in mesh.material)) continue;
			(mesh.material as THREE.MeshStandardMaterial).emissiveIntensity =
				0.05 + ((Math.sin(elapsed * 0.005) + 1) / 2) * 0.75;
		}

		// 카메라 각도 스냅 (싱글턴 재사용)
		if (controls && !camInputFocused) {
			const cam = camera as THREE.PerspectiveCamera;
			_snapOffset.subVectors(cam.position, controls.target);
			_sph.setFromVector3(_snapOffset);
			_sph.theta = Math.round(_sph.theta / ANGLE_STEP) * ANGLE_STEP;
			_sph.phi = Math.round(_sph.phi / ANGLE_STEP) * ANGLE_STEP;
			_sph.phi = Math.max(
				controls.minPolarAngle,
				Math.min(controls.maxPolarAngle, _sph.phi),
			);
			_snapOffset.setFromSpherical(_sph);
			cam.position.copy(controls.target).add(_snapOffset);
			cam.lookAt(controls.target);
		}

		// 카메라 입력창 갱신 — 값이 바뀔 때만 DOM write
		if (controls && !camInputFocused) {
			const cam = camera as THREE.PerspectiveCamera;
			const rx = Math.round(cam.position.x).toString();
			const ry = Math.round(cam.position.y).toString();
			const rz = Math.round(cam.position.z).toString();
			const rd = Math.round(
				cam.position.distanceTo(controls.target),
			).toString();
			const tx = Math.round(controls.target.x).toString();
			const ty = Math.round(controls.target.y).toString();
			const tz = Math.round(controls.target.z).toString();
			if (camXEl && camXEl.value !== rx) camXEl.value = rx;
			if (camYEl && camYEl.value !== ry) camYEl.value = ry;
			if (camZEl && camZEl.value !== rz) camZEl.value = rz;
			if (camDEl && camDEl.value !== rd) camDEl.value = rd;
			if (tgtXEl && tgtXEl.value !== tx) tgtXEl.value = tx;
			if (tgtYEl && tgtYEl.value !== ty) tgtYEl.value = ty;
			if (tgtZEl && tgtZEl.value !== tz) tgtZEl.value = tz;
		}
	});

	return null;
}
