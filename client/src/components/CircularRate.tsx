import { Box, Typography, CircularProgress } from '@mui/material';

interface CircularRateProps {
    rate: number;
}

const CircularRate = ({ rate }: CircularRateProps) => {
    const getColor = (rate: number) => {
        if (rate > 7) return '#00A305'; // Verde
        if (rate > 5) return '#E49B0F'; // Amarelo
        return '#CB0000'; // Vermelho
    };

    return (
        <Box
            sx={{
                position: 'relative',
                display: 'inline-block',
                width: "max-content",
            }}
            className="rounded-full bg-blue-800 p-0.5"
        >
            <CircularProgress
                variant='determinate'
                value={!Number.isNaN(rate*10) ? rate * 10 : 0}
                sx={{ color: getColor(rate) }}
                size={40}
                className='rounded-full ring-blue-900'
            />
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography
                    variant='caption'
                    component="div"
                    fontWeight="700"
                    sx={{ marginTop: "-4px" }}
                    className='text-white'
                >
                    {rate*10 ? `${rate*10}%` : 'NR'}
                </Typography>
            </Box>
        </Box>
    );
}

export default CircularRate;