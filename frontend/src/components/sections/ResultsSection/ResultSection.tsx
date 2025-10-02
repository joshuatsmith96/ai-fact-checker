import { Link, List, ListItem, Stack, Typography } from '@mui/material';
import { Section } from '../../blocks/Section';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

export const ResultSection = () => {
  return (
    <Section>
      <Stack gap={3} width={'100%'}>
        <Stack sx={{ width: '100%' }}>
          <Typography fontWeight={'bold'} fontSize={'18px'}>
            User's Question
          </Typography>
          <Typography color="#4c4c4cff">
            Is it true that eating dark chocolate can significantly improve
            brain function, including memory and cognitive processing speed?
          </Typography>
        </Stack>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          sx={{
            backgroundColor: '#e9e9e9ff',
            width: '100%',
            padding: 2,
            boxSizing: 'border-box',
          }}
        >
          <Stack
            direction={'row'}
            gap={2}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <ErrorOutlineIcon />
            <Typography fontSize={'20px'} fontWeight={'bold'}>
              Partially True
            </Typography>
          </Stack>
          <Typography>Confidence: 85%</Typography>
        </Stack>
        <Stack width={'100%'}>
          <Typography variant="h6" fontWeight={'bold'}>
            Verified Facts
          </Typography>
          <Accordion>
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              sx={{ fontSize: '16px' }}
            >
              Fact Category 1
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '5px 40px 5px 40px' }}>
              <List sx={{ listStyleType: 'disc' }}>
                <ListItem sx={{ display: 'list-item' }}>Item 1</ListItem>
                <ListItem sx={{ display: 'list-item' }}>Item 2</ListItem>
                <ListItem sx={{ display: 'list-item' }}>Item 3</ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Stack>
        <Stack gap={2}>
          <Typography variant="h6" fontWeight={'bold'}>
            Source References
          </Typography>
          <Stack
            direction={'row'}
            gap={3}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <InsertLinkIcon />
            <Stack>
              <Typography>
                <Link href="https://www.google.com">
                  Source Link Title Would Go Here
                </Link>
              </Typography>
              <Typography>
                A quick little description of the article, what it talks about,
                and a little bit more than that. Just trying to fill up space
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Section>
  );
};
