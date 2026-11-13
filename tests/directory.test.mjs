import test from 'node:test';
import assert from 'node:assert/strict';
import {places} from '../dist/data/content.js';
import {directoryPlaces,place2gisUrl} from '../dist/modules/places-directory.js';

test('directory city/type filters cover all twelve addresses and every combination',()=>{
 assert.equal(directoryPlaces().length,12);
 for(const city of ['all','astana','almaty','shymkent'])for(const type of ['all','service','migration','bank','medical']){
  assert.deepEqual(directoryPlaces(city,type),places.filter(place=>(city==='all'||place.city===city)&&(type==='all'||place.type===type)));
 }
 assert.equal(directoryPlaces('__proto__','unknown').length,12);
});
test('all 2GIS links contain the correct city, complete name and address without query injection',()=>{
 for(const place of places){
  const url=new URL(place2gisUrl(place));assert.equal(url.origin,'https://2gis.kz');assert.equal(url.pathname.split('/')[1],place.city);
  assert.equal(decodeURIComponent(url.pathname.split('/search/')[1]),`${place.name.ru} ${place.address.ru}`);assert.equal(url.search,'');assert.equal(url.hash,'');
 }
 assert.equal(place2gisUrl({...places[0],city:'../evil.example'}),null);
 const url=new URL(place2gisUrl({...places[0],name:{ru:'A&B # test'},address:{ru:'1/? q'}}));assert.equal(url.search,'');assert.equal(url.hash,'');
});
