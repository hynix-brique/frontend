import type { SpinProps } from "antd";
import { Spin as AntdSpin, Input } from "antd";
import type React from "react";

export const TextField = Input;

export const Spin = AntdSpin as React.FC<
	SpinProps & { tipType?: string; value?: number; percent?: number }
>;
