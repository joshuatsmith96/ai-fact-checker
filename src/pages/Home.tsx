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
import { useGemini } from '../utilities/useGemini';

export const Home = () => {
  const [response, setResponse] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const slideFadeRef = useRef<SlideFadeRef>(null);

  const { callGemini, loading, error } = useGemini();

  const fadeOut = () => {
    slideFadeRef.current?.hide();
  };

  const handleSubmit = async () => {
    const result = await callGemini(search);
    if (result) {
      setResponse(result);
    }
    console.log(response);
  };

  const onSearch = () => {
    console.log('Fadding out');
    fadeOut();
    console.log('Submitting data to AI');
    handleSubmit();
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
            onClick={onSearch}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            sx={{ width: '200px', py: 1.5 }}
            onClick={onSearch}
          >
            Random
          </Button>
        </Stack>
      </SlideFade>
    </Section>
  );
};
