/// <reference types="node" />
import { PlotData, Layout } from 'plotly.js';
import { Server } from 'http';
interface IServer {
    active: boolean;
    loading: boolean;
    instance: Server | null;
}
export declare const server: IServer;
export declare function clear(): void;
export declare function stack(data: Partial<PlotData>[], layout?: Partial<Layout>): void;
export declare function plot(data?: Partial<PlotData>[] | null, layout?: Partial<Layout>, cb?: Function): void;
export {};
