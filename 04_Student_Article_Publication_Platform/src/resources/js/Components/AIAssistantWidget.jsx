import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Box, Fab, IconButton, Paper, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';

const cannedReplies = {
    'How do I submit an article?': 'Go to Writer Dashboard, create or edit a draft, then click Submit.',
    'How does review work?': 'Editors can request revision with comments or publish submitted articles.',
    'Where can students comment?': 'Students can comment directly from Student Dashboard on published articles.',
};

export default function AIAssistantWidget() {
    const [open, setOpen] = useState(false);
    const [activeQuestion, setActiveQuestion] = useState('How do I submit an article?');

    const questions = useMemo(() => Object.keys(cannedReplies), []);

    return (
        <Box sx={{ position: 'fixed', right: 18, bottom: 18, zIndex: 1300 }}>
            {open && (
                <Paper sx={{ width: 330, p: 2, mb: 1.5 }}>
                    <Stack spacing={1.5}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Stack direction="row" spacing={1} alignItems="center">
                                <AutoAwesomeIcon color="primary" fontSize="small" />
                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                    Journal Assistant
                                </Typography>
                            </Stack>
                            <IconButton size="small" onClick={() => setOpen(false)}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Stack>

                        <Typography variant="body2" color="text.secondary">
                            Quick hard-coded guide for common workflow questions.
                        </Typography>

                        <Stack spacing={0.8}>
                            {questions.map((question) => (
                                <Paper
                                    key={question}
                                    variant="outlined"
                                    onClick={() => setActiveQuestion(question)}
                                    sx={{
                                        p: 1,
                                        cursor: 'pointer',
                                        borderColor: activeQuestion === question ? 'primary.main' : 'divider',
                                        backgroundColor: activeQuestion === question ? 'primary.light' : '#fff',
                                    }}
                                >
                                    <Typography variant="body2">{question}</Typography>
                                </Paper>
                            ))}
                        </Stack>

                        <Paper variant="outlined" sx={{ p: 1.25, backgroundColor: '#fff' }}>
                            <Typography variant="body2" sx={{ fontWeight: 700, mb: 0.5 }}>
                                Answer
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {cannedReplies[activeQuestion]}
                            </Typography>
                        </Paper>
                    </Stack>
                </Paper>
            )}

            <Fab color="primary" onClick={() => setOpen((value) => !value)} aria-label="AI assistant">
                <SmartToyOutlinedIcon />
            </Fab>
        </Box>
    );
}
