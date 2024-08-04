import React, {Suspense} from 'react';
import {Canvas, useFrame, useThree} from "@react-three/fiber";
import Model from "@/entities/Scene/model/model";
import {
    ArcballControls, DeviceOrientationControls,
    DragControls,
    FaceControls, FlyControls, MapControls,
    OrbitControls, PivotControls, PointerLockControls,
    TrackballControls,
    TransformControls
} from "@react-three/drei";
import {Loader} from "lucide-react";
import {Vector3} from "three";

const Scene = () => {
    return (
        <Canvas>
            <Suspense fallback={null}>
                <Model />
            </Suspense>
        </Canvas>
    );
};

export default Scene;