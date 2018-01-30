var geojson2dsv = require('../');
var test = require('tap').test;

test('geojson2dsv', function(t) {
  t.test('encodes a single point', function(t) {
    t.equal(
      geojson2dsv({
        type: 'Point',
        coordinates: [0, 0]
      }),
      'geometry\nPOINT(0 0)'
    );
    t.end();
  });
  t.test('customizes a delimiter', function(t) {
    t.equal(
      geojson2dsv(
        {
          type: 'Point',
          coordinates: [0, 0]
        },
        ';'
      ),
      'geometry\nPOINT(0 0)'
    );
    t.end();
  });
  t.test('encodes a feature', function(t) {
    t.equal(
      geojson2dsv({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [0, 0]
        },
        properties: {
          a: 'b'
        }
      }),
      'a,geometry\nb,POINT(0 0)'
    );
    t.end();
  });
  t.test('encodes a featurecollection', function(t) {
    t.equal(
      geojson2dsv({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [10, 0]
            },
            properties: {
              a: 'b'
            }
          }
        ]
      }),
      'a,geometry\nb,POINT(0 10)'
    );
    t.end();
  });
  t.test('encodes properties of LineString', function(t) {
    t.equal(
      geojson2dsv({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [[10, 0], [11, 0]]
            },
            properties: {
              a: 'b'
            }
          }
        ]
      }),
      'a,geometry\nb,"LINESTRING(0 10,0 11)"'
    );
    t.end();
  });

  t.end();
});
