const mongoose = require('mongoose');
const db = require('../config/db');
const Line = require('../models/line');

mongoose.connect(db.uri);

Line.collection.drop();

Line.create([{
  tflId: 'bakerloo',
  modeName: 'tube',
  name: 'Bakerloo',
  handle: 'backerlooline',
  color: '#894e24'

},

{
  tflId: 'central',
  modeName: 'tube',
  name: 'Central',
  handle: 'centralline',
  color: '#dc241f'

},
{
  tflId: 'hammersmith-city',
  modeName: 'tube',
  name: 'Hammersmith & City',
  handle: 'tubehcity',
  color: '#d799af'

},
{
  tflId: 'circle',
  modeName: 'tube',
  name: 'Circle',
  handle: 'circleline',
  color: '#ffce00'

},
{
  tflId: 'district',
  modeName: 'tube',
  name: 'District',
  handle: 'districtline',
  color: '#007229'

},
{
  tflId: 'london-overground',
  modeName: 'overground',
  name: 'Overground',
  handle: 'LDNOverground',
  color: '#e86a10'

},
{
  tflId: 'jubliee',
  name: 'Jubliee',
  modeName: 'tube',
  handle: 'jublieeline',
  color: '#6a7278'

},
{
  tflId: 'metropolitan',
  name: 'Metropolitan',
  modeName: 'tube',
  handle: 'metline',
  color: '#751056'

},
{
  tflId: 'northern',
  name: 'Northern',
  modeName: 'tube',
  handle: 'northernline',
  color: '#000000'

},
{
  tflId: 'picadilly',
  name: 'Picadilly',
  modeName: 'tube',
  handle: 'picadillyline',
  color: '#0019a8'

},
{
  tflId: 'victoria',
  name: 'Victoria',
  modeName: 'tube',
  handle: 'victorialine',
  color: '#00a0e2'

},
{
  tflId: 'waterloo-city',
  name: 'Waterloo & City',
  modeName: 'tube',
  handle: 'wlooandcityline',
  color: '#76d0bd'

},
{
  tflId: 'dlr',
  name: 'DLR',
  modeName: 'tube',
  handle: 'LondonDLR',
  color: '#00afad'

}], (err, lines) => {
  if(err) console.log('There was an error creating lines', err);

  console.log(`${lines.length} lines created!`);
  mongoose.connection.close();
});
