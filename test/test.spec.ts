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
    plot(test, (plotId: number) => {
      get(`http://localhost:8080/plots/${plotId}`, (res) => {
        let body = '';
        res.on('data', data => {
            body += data;
        });
        res.on('end', () => {
          assert.match(body.toString(), /<!DOCTYPE html>[\s\S]*<html[\s\S.]*>[\s\S.]*<\/html>/);
          done();
        });
      });
    });
  });

  it('should get plot 2 data', (done) => {
    stack(test);
    stack(test);
    stack(test);
    plot(null, (plotId: number) => {
      get(`http://localhost:8080/data/${plotId}`, (res) => {
        let body = '';
        res.on('data', data => {
            body += data;
        });
        res.on('end', () => {
          const data = JSON.parse(body.toString());
          expect(data).to.eql([test, test, test]);
          done();
        });
      });
    });
  });

  it('Test plot 3 without callback', () => {
    clear();
    plot([...test, ...test]);
  });
});

