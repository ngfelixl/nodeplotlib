/// <reference types="node" />
import { PlotData } from 'plotly.js';
import { Server } from 'http';
interface IServer {
    active: boolean;
    loading: boolean;
    instance: Server | null;
}
export declare const server: IServer;
export declare function clear(): void;
export declare function stack(data: Partial<PlotData>[]): void;
export declare function plot(data?: Partial<PlotData>[] | null, cb?: Function): number;
export {};
