import React, { useState } from 'react';
import {
  Snackbar,
  Alert,
  IconButton,
  Button,
  Box,
  Typography
} from '@mui/material';
import {
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon
} from '@mui/icons-material';

const notificationTypes = {
  success: {
    icon: <CheckCircleIcon />,
    color: 'success'
  },
  error: {
    icon: <ErrorIcon />,
    color: 'error'
  },
  warning: {
    icon: <WarningIcon />,
    color: 'warning'
  },
  info: {
    icon: <InfoIcon />,
    color: 'info'
  }
};

function MuiNotification() {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    type: 'info',
    duration: 6000
  });

  const showNotification = (message, type = 'info', duration = 6000) => {
    setNotification({
      message,
      type,
      duration
    });
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  // Демонстрационные уведомления
  const showDemoNotifications = () => {
    const notifications = [
      { message: 'Технология успешно добавлена!', type: 'success', duration: 3000 },
      { message: 'Ошибка при сохранении данных', type: 'error', duration: 4000 },
      { message: 'Проверьте сроки изучения', type: 'warning', duration: 5000 },
      { message: 'Новая версия доступна', type: 'info', duration: 6000 }
    ];

    // Показываем уведомления одно за другим
    notifications.forEach((notif, index) => {
      setTimeout(() => {
        showNotification(notif.message, notif.type, notif.duration);
      }, index * 4000); // Задержка между уведомлениями
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Компонент уведомлений Material-UI
      </Typography>
      
      <Typography variant="body1" color="text.secondary" gutterBottom>
        Snackbar для отображения временных уведомлений с различными типами
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 3, mb: 3 }}>
        <Button
          variant="contained"
          color="success"
          startIcon={<CheckCircleIcon />}
          onClick={() => showNotification('Операция выполнена успешно!', 'success')}
        >
          Success
        </Button>
        
        <Button
          variant="contained"
          color="error"
          startIcon={<ErrorIcon />}
          onClick={() => showNotification('Произошла ошибка!', 'error')}
        >
          Error
        </Button>
        
        <Button
          variant="contained"
          color="warning"
          startIcon={<WarningIcon />}
          onClick={() => showNotification('Предупреждение!', 'warning')}
        >
          Warning
        </Button>
        
        <Button
          variant="contained"
          color="info"
          startIcon={<InfoIcon />}
          onClick={() => showNotification('Информационное сообщение', 'info')}
        >
          Info
        </Button>
      </Box>

      <Button
        variant="outlined"
        onClick={showDemoNotifications}
        sx={{ mt: 2 }}
      >
        Показать демонстрацию всех типов
      </Button>

      <Snackbar
        open={open}
        autoHideDuration={notification.duration}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={{
          '& .MuiAlert-root': {
            alignItems: 'center'
          }
        }}
      >
        <Alert
          onClose={handleClose}
          severity={notification.type}
          variant="filled"
          icon={notificationTypes[notification.type]?.icon}
          action={action}
          sx={{ 
            width: '100%',
            '& .MuiAlert-icon': {
              fontSize: '1.5rem'
            }
          }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <Box sx={{ mt: 4, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Особенности компонента:
        </Typography>
        <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
          <li><Typography variant="body2">4 типа уведомлений: success, error, warning, info</Typography></li>
          <li><Typography variant="body2">Автоматическое закрытие через указанное время</Typography></li>
          <li><Typography variant="body2">Возможность ручного закрытия (крестик)</Typography></li>
          <li><Typography variant="body2">Адаптивный дизайн для всех размеров экрана</Typography></li>
          <li><Typography variant="body2">Иконки соответствуют типу уведомления</Typography></li>
        </ul>
      </Box>
    </Box>
  );
}

export default MuiNotification;