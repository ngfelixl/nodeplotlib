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

  plot(test);
  clear();
  
  stack(test);
  stack(test);
  stack(test);
  plot();
  
  it('should serve a website', (done) => {
    get('http://localhost:8080', (res) => {
      let body = '';
      res.on('data', data => {
          body += data;
      });
      res.on('end', () => {
        assert.match(body.toString(), /<!DOCTYPE html>[\s\S]*<html>[\s\S.]*<\/html>/);
        done();
      });
    })
  });

  it('should get plot data', (done) => {
    get('http://localhost:8080/data', (res) => {
      let body = '';
      res.on('data', data => {
          body += data;
      });
      res.on('end', () => {
        const data = JSON.parse(body.toString());
        expect(data).to.eql([test, test, test]);
        done();
      })
    });
  });
})

