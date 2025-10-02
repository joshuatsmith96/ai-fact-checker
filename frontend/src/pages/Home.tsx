import {
  Stack,
  Typography,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
} from '@mui/material';
import { Section } from '../components/blocks/Section';
import SearchIcon from '@mui/icons-material/Search';
import {
  SlideFade,
  type SlideFadeRef,
} from '../components/blocks/SlideFade/SlideFade';
import { useRef, useState, useEffect } from 'react';
import { useGemini } from '../utilities/useGemini';
import { ResultSection } from '../components/sections/ResultsSection/ResultSection';

export const Home = () => {
  const [search, setSearch] = useState<string>('');
  const slideFadeRef = useRef<SlideFadeRef>(null);
  const searchSectionRef = useRef<HTMLDivElement>(null);

  const { data, loading, error, generateData } = useGemini();

  const fadeOut = () => {
    slideFadeRef.current?.hide();
    setTimeout(() => {
      searchSectionRef.current?.setAttribute('display', 'none');
    }, 200);
  };

  const onSearch = async () => {
    fadeOut();
    await generateData(search);
  };

  useEffect(() => {
    console.log('Updated data:', data);
  }, [data]);

  return (
    <Section
      id="home"
      sx={{
        height: loading ? '80vh' : '160px',
        justifyContent: loading ? 'start' : 'center',
        alignItems: 'center',
      }}
    >
      <SlideFade ref={slideFadeRef} direction="down">
        {/* Header */}
        <Stack
          justifyContent="center"
          alignItems="center"
          ref={searchSectionRef}
        >
          <Typography variant="h4" color="#1976d2" fontWeight="bold">
            AI Fact Checker
          </Typography>
          <Typography fontSize="18px" color="#767676ff">
            Retrieve an unbiased breakdown for a specific question
          </Typography>
        </Stack>

        {/* Input Field */}
        <Stack alignItems="center" justifyContent="center">
          <TextField
            label="Fact to check"
            variant="outlined"
            value={search}
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
              '& .MuiOutlinedInput-root': { borderRadius: '50px' },
            }}
            fullWidth
          />
        </Stack>

        {/* Search Button */}
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={5}
          mt={3}
        >
          <Button
            variant="contained"
            sx={{ width: '200px', py: 1.5 }}
            onClick={onSearch}
            disabled={loading || !search}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Search'
            )}
          </Button>
        </Stack>
      </SlideFade>

      {/* Response Section */}
      <Stack mt={4} width="100%">
        {loading && <CircularProgress size={50} color="inherit" />}
        {error && (
          <Typography color="error" fontSize="16px" mt={2}>
            {error}
          </Typography>
        )}
        {data && <ResultSection data={data} />}
      </Stack>
    </Section>
  );
};
