import {
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Button,
} from '@mui/material';
import { Section } from '../components/blocks/Section';
import SearchIcon from '@mui/icons-material/Search';
import {
  SlideFade,
  type SlideFadeRef,
} from '../components/blocks/SlideFade/SlideFade';
import { useRef, useState } from 'react';

export const Home = () => {
  const [search, setSearch] = useState<string>('');
  const slideFadeRef = useRef<SlideFadeRef>(null);

  const fadeOut = () => {
    slideFadeRef.current?.hide();
  };

  const onSearch = () => {
    fadeOut();
  };

  return (
    <Section
      id="home"
      sx={{ height: '80vh', justifyContent: 'center', alignItems: 'center' }}
    >
      <SlideFade ref={slideFadeRef} direction="down">
        <Stack justifyContent={'center'} alignItems={'center'}>
          <Typography variant="h4" color="#1976d2" fontWeight="bold">
            AI Fact Checker
          </Typography>
          <Typography fontSize={'18px'} color="#767676ff">
            Retrieve an unbiased breakdown for a specific question
          </Typography>
        </Stack>
        <Stack alignItems={'center'} justifyContent={'center'}>
          <TextField
            label="Fact to check"
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              mt: 6,
              width: '60%',
              '& .MuiOutlinedInput-root': {
                borderRadius: '50px',
              },
            }}
            fullWidth
          />
        </Stack>
        <Stack
          direction={'row'}
          justifyContent={'center'}
          alignItems={'center'}
          gap={5}
          mt={3}
        >
          <Button
            variant="contained"
            sx={{ width: '200px', py: 1.5 }}
            onClick={fadeOut}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            sx={{ width: '200px', py: 1.5 }}
            onClick={onSearch}
          >
            Trending
          </Button>
        </Stack>
      </SlideFade>
    </Section>
  );
};
