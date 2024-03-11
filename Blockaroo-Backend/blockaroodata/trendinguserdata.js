const userData1 = [
  {
    avatar: './alligator/416065227_1542520369843785_8595475442027501823_n.jpg',
    username: 'LunaLommer',
    userid: '@NightSkyWeaver',
  },
  {
    avatar: './lion/416157513_1069794400957062_5710270874854932509_n.jpg',
    username: 'AuroraSeeker',
    userid: '@RadiantExplorer',
  },
  {
    avatar: './koala/416199293_1040732503702083_6647909924910406852_n.jpg',
    username: 'SolarSculptor',
    userid: '@SunlitArtisan',
  },
  {
    avatar: './kangaroo/416071763_7756971017665712_2843076439882045299_n.jpg',
    username: 'TerraTracer',
    userid: '@EarthboundSeeker',
  },
];

const userData2 = [
  {
    avatar: './lion/418851617_2741009229412405_1470887581767822196_n.jpg',
    username: 'NebulaNomad',
    userid: '@CelestialRoamer',
  },
  {
    avatar: './koala/418733756_745540470782016_6403364627831797775_n.jpg',
    username: 'ZenMastermind',
    userid: '@TranquilTrailblazer',
  },
  {
    avatar: './alligator/416123022_334019362930752_8538159204828438092_n.jpg',
    username: 'EnigmaWanderer',
    userid: '@PuzzlePioneer',
  },
  {
    avatar: './koala/420637536_352617811043568_5716616640134551334_n.jpg',
    username: 'ElysianScribe',
    userid: '@EtherealWorldsmith',
  },
];

const jsonData = {
  userData1,
  userData2,
};

const jsonString = JSON.stringify(jsonData, null, 2);

console.log(jsonString);

export default jsonData;

