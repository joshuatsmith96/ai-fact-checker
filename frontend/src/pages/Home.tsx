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
import { useRef, useState } from 'react';
import { useGemini } from '../utilities/useGemini';

export const Home = () => {
  const [search, setSearch] = useState<string>('');
  const slideFadeRef = useRef<SlideFadeRef>(null);

  const { text, loading, error, generateText } = useGemini();

  const fadeOut = () => {
    slideFadeRef.current?.hide();
  };

  const onSearch = async () => {
    fadeOut();
    await generateText(search);
  };

  return (
    <Section
      id="home"
      sx={{ height: '80vh', justifyContent: 'center', alignItems: 'center' }}
    >
      <SlideFade ref={slideFadeRef} direction="down">
        <Stack justifyContent="center" alignItems="center">
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
              '& .MuiOutlinedInput-root': {
                borderRadius: '50px',
              },
            }}
            fullWidth
          />
        </Stack>

        {/* Buttons */}
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

          <Button
            variant="outlined"
            sx={{ width: '200px', py: 1.5 }}
            onClick={onSearch}
            disabled={loading}
          >
            Random
          </Button>
        </Stack>
      </SlideFade>
      {/* Response */}
      <Stack mt={4} alignItems="center" maxWidth="60%">
        {error && (
          <Typography color="error" fontSize="16px">
            {error}
          </Typography>
        )}
        {text && !loading && (
          <Typography fontSize="16px" color="#333" textAlign="center">
            {text.toString()}
          </Typography>
        )}
      </Stack>
    </Section>
  );
};
