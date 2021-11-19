import type { NextPage } from 'next';
import { Box, Flex, Input, InputGroup, InputLeftAddon } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'mapbox-gl-compare/dist/mapbox-gl-compare.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import { LinkTwo } from '@icon-park/react';

const Home: NextPage = () => {
  // read & write Ref
  const map1Ref = useRef<maplibregl.Map>(null!);
  const map2Ref = useRef<maplibregl.Map>(null!);
  const [mapLeftStyle, setMapLeftStyle] = useState('');
  const [mapRightStyle, setMapRightStyle] = useState('');
  useEffect(() => {
    const MapboxCompare = require('mapbox-gl-compare');
    map1Ref.current = new maplibregl.Map({
      container: 'map1',
      style: mapLeftStyle,
      center: [0, 0],
      zoom: 0,
    });

    map2Ref.current = new maplibregl.Map({
      container: 'map2',
      style: mapRightStyle,
      center: [0, 0],
      zoom: 0,
      hash: true,
    });

    const container = '#comparison-container';
    new MapboxCompare(map1Ref.current, map2Ref.current, container, {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Flex flexDirection={'column'} height={'100vh'} width={'100%'}>
      <Flex>
        <InputGroup>
          <InputLeftAddon borderRadius={0}>
            <LinkTwo />
          </InputLeftAddon>
          <Input
            borderRadius={0}
            value={mapLeftStyle}
            onChange={(e) => {
              setMapLeftStyle(e.target.value);
              if (map1Ref.current) {
                map1Ref.current.setStyle(e.target.value);
              }
            }}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon borderRadius={0}>
            <LinkTwo />
          </InputLeftAddon>
          <Input
            borderRadius={0}
            value={mapRightStyle}
            onChange={(e) => {
              setMapRightStyle(e.target.value);
              if (map2Ref.current) {
                map2Ref.current.setStyle(e.target.value);
              }
            }}
          />
        </InputGroup>
      </Flex>
      <Box id="comparison-container" position={'relative'} flex={1}>
        <Box
          id={'map1'}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%',
          }}
        />
        <Box
          id={'map2'}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '100%',
          }}
        />
      </Box>
    </Flex>
  );
};

export default Home;
