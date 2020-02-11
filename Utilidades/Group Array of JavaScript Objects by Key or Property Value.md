# Group Array of JavaScript Objects by Key or Property Value

## Implementation

```js
const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});
```

Or using an implicit return (slower):

```js
const groupBy = key => array =>
  array.reduce(
    (objectsByKeyValue, obj) => ({
      ...objectsByKeyValue,
      [obj[key]]: (objectsByKeyValue[obj[key]] || []).concat(obj)
    }),
    {}
  );
```

## Usage

```js
const cars = [
  { brand: 'Audi', color: 'black' },
  { brand: 'Audi', color: 'white' },
  { brand: 'Ferarri', color: 'red' },
  { brand: 'Ford', color: 'white' },
  { brand: 'Peugot', color: 'white' }
];

const groupByBrand = groupBy('brand');
const groupByColor = groupBy('color');

console.log(
  JSON.stringify({
    carsByBrand: groupByBrand(cars),
    carsByColor: groupByColor(cars)
  }, null, 2)
);
```

### Output

```json
{
  "carsByBrand": {
    "Audi": [
      {
        "brand": "Audi",
        "color": "black"
      },
      {
        "brand": "Audi",
        "color": "white"
      }
    ],
    "Ferarri": [
      {
        "brand": "Ferarri",
        "color": "red"
      }
    ],
    "Ford": [
      {
        "brand": "Ford",
        "color": "white"
      }
    ],
    "Peugot": [
      {
        "brand": "Peugot",
        "color": "white"
      }
    ]
  },
  "carsByColor": {
    "black": [
      {
        "brand": "Audi",
        "color": "black"
      }
    ],
    "white": [
      {
        "brand": "Audi",
        "color": "white"
      },
      {
        "brand": "Ford",
        "color": "white"
      },
      {
        "brand": "Peugot",
        "color": "white"
      }
    ],
    "red": [
      {
        "brand": "Ferarri",
        "color": "red"
      }
    ]
  }
}
```