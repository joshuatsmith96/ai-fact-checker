import { Link, List, ListItem, Stack, Typography } from '@mui/material';
import { Section } from '../../blocks/Section';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ResultSection = ({ data }: { data: any }) => {
  const aiData = data[0];

  return (
    <Section
      sx={{
        width: '100%',
        maxWidth: 800,
        px: 2,
        mx: 'auto',
        overflowX: 'hidden',
      }}
    >
      <Stack gap={3} width="100%">
        {/* User Question */}
        <Stack sx={{ width: '100%' }}>
          <Typography fontWeight="bold" fontSize="18px">
            User's Question
          </Typography>
          <Typography color="#4c4c4cff" sx={{ wordBreak: 'break-word' }}>
            {aiData.users_question}
          </Typography>
        </Stack>

        {/* Validity Box */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            backgroundColor: '#e9e9e9ff',
            width: '100%',
            padding: 2,
            boxSizing: 'border-box',
            borderRadius: 2,
            overflowX: 'hidden',
          }}
        >
          <Stack direction="row" gap={2} alignItems="center">
            <ErrorOutlineIcon />
            <Typography fontSize="20px" fontWeight="bold">
              {aiData.validity}
            </Typography>
          </Stack>
          <Typography>Confidence: {aiData.confidence}%</Typography>
        </Stack>

        {/* Verified Facts */}
        <Stack width="100%">
          <Typography variant="h6" fontWeight="bold">
            Verified Facts
          </Typography>
          {aiData.verified_facts.map((fact: any, index: number) => (
            <Accordion key={index}>
              <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                sx={{ fontSize: '16px', fontWeight: 'bold' }}
              >
                {fact.category}
              </AccordionSummary>
              <AccordionDetails sx={{ px: { xs: 2, sm: 4 }, py: 1 }}>
                <List sx={{ listStyleType: 'disc', pl: 2 }}>
                  {fact.facts.map((f: string, i: number) => (
                    <ListItem key={i} sx={{ display: 'list-item' }}>
                      <Typography sx={{ wordBreak: 'break-word' }}>
                        {f}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>

        {/* Sources */}
        <Stack gap={2}>
          <Typography variant="h6" fontWeight="bold">
            Source References
          </Typography>
          {aiData.sources.map((source: any) => (
            <Link href={source.source_link} key={source.id}>
              <Stack
                direction="row"
                gap={2}
                alignItems="flex-start"
                sx={{ flexWrap: 'wrap' }}
              >
                <InsertLinkIcon />
                <Stack>
                  <Typography sx={{ wordBreak: 'break-word' }}>
                    {source.title}
                  </Typography>
                  <Typography sx={{ wordBreak: 'break-word' }}>
                    {source.source_description}
                  </Typography>
                </Stack>
              </Stack>
            </Link>
          ))}
        </Stack>
      </Stack>
    </Section>
  );
};
