import { plot, stack, clear } from '../dist';
import { PlotData } from 'plotly.js';
import { get } from 'http';

import { expect, assert } from 'chai';
import 'mocha';

describe('Test plotting', () => {
  const test: Partial<PlotData>[] = [{
    x: [0, 2, 4, 6],
    y: [4, 6, 2, 5],
    type: 'scatter'
  }];

  it('should serve a website for plot 1', (done) => {
    plot(test, {title: 'Plot1'}, (plotId: number) => {
      get(`http://localhost:8080/plots/${plotId}`, (res) => {
        let body = '';
        res.on('data', data => {
          body += data;
        });
        res.on('end', () => {
          assert.match(body.toString(), /<!DOCTYPE html>[\s\S]*<html[\s\S.]*>[\s\S.]*<\/html>/);
          done();
        });
        res.on('error', () => { done(); });
      });

      get(`http://localhost:8080/data/${plotId}`, (res) => {});
    });
  });

  it('should get plot 2 data plotted with stack()', (done) => {
    stack(test, {title: 'Plot2'});
    stack(test);
    stack(test);
    plot(null, undefined, (plotId: number) => {
      get(`http://localhost:8080/data/${plotId}`, (res) => {
        let body = '';
        res.on('data', data => {
            body += data;
        });
        res.on('end', () => {
          const data = JSON.parse(body.toString());
          expect(data).to.eql([{data: test, layout: {title: 'Plot2'}}, {data: test}, {data: test}]);
          done();
        });
        res.on('error', () => { done(); });
      });
    });
  });

  it('should spawn plot4 while plot3 not finished', (done) => {
    clear();
    plot(test, undefined, (plot3Id: number) => {
      get(`http://localhost:8080/data/${plot3Id}`);

      plot(test, undefined, (plotId: number) => {
        get(`http://localhost:8080/data/${plotId}`, (res) => {
          let body = '';
          res.on('data', data => {
              body += data;
          });
          res.on('end', () => {
            const data = JSON.parse(body.toString());
            expect(data).to.eql([{data: test}]);
            done();
          });
          res.on('error', (error) => { console.error(error); done(); });
        });
      });
    });
  });
});

