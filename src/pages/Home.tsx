import { Stack, Typography, TextField, InputAdornment } from '@mui/material';
import { Section } from '../components/blocks/Section';
import SearchIcon from '@mui/icons-material/Search';

export const Home = () => {

    return (
        <Section id="home" sx={{height: '80vh', justifyContent: 'center', alignItems: 'center'}}>
            <Stack justifyContent={'center'} alignItems={'center'}>
                <Typography variant='h4' color='#9252ffff' fontWeight='bold'>AI Fact Checker</Typography>
                <Typography fontSize={'18px'} color='#767676ff'>Retrieve an unbiased breakdown for a specific question</Typography>
            </Stack>
            <Stack alignItems={'center'} justifyContent={'center'}>
                 <TextField
                    label="Fact to check"
                    variant="outlined"
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
                        borderRadius: '50px', // Circular edges
                        },
                    }}
                    fullWidth
                />
            </Stack>
        </Section>
    );
};