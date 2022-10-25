import resolve from "@rollup/plugin-node-resolve";
import css from 'rollup-plugin-import-css';
import external from 'rollup-plugin-peer-deps-external';
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

const packageJson = require("./package.json");

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packageJson.main,
                sourcemap: true,
                format: "cjs",
            },
            {
                file: packageJson.module,
                sourcemap: true,
                format: "esm",
            },
            {
                file: packageJson.umd,
                format: "umd",
                sourcemap: true,
                name: "SpotlightSearchModules"
            }
        ],
        plugins: [
            resolve(),
            external(),
            commonjs(),
            css(),
            typescript({tsconfig: "./tsconfig.json"}),
        ],
        external: ["react", "react-dom"]
    },
    {
        input: "dist/esm/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: "esm" }],
        plugins: [dts()],
        external: [/\.css$/],
    },
];