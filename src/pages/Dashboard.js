import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
  Chip
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
  AddCircle as AddCircleIcon
} from '@mui/icons-material';
import useTechnologies from '../hooks/useTechnologies';

// Компонент для содержимого вкладок
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function Dashboard() {
  const [tabValue, setTabValue] = useState(0);
  const [notificationCount] = useState(3);
  const { technologies, getStats } = useTechnologies();
  const stats = getStats();

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Расчет процента выполнения
  const completionPercentage = stats.total > 0
    ? Math.round((stats.completed / stats.total) * 100)
    : 0;

  // Получение статуса на русском
  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return 'Завершено';
      case 'in-progress': return 'В процессе';
      case 'planned': return 'Запланировано';
      case 'paused': return 'Приостановлено';
      default: return status;
    }
  };

  // Получение цвета статуса
  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return 'success';
      case 'in-progress': return 'info';
      case 'planned': return 'warning';
      case 'paused': return 'error';
      default: return 'default';
    }
  };

  // Категории для фильтрации
  const categories = ['frontend', 'backend', 'database', 'devops', 'mobile', 'tools', 'other'];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Шапка приложения */}
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Панель управления технологиями
          </Typography>

          {/* Иконка уведомлений с бейджем */}
          <IconButton color="inherit">
            <Badge badgeContent={notificationCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Вкладки */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard tabs">
          <Tab label="Обзор" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
          <Tab label="Статистика" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
          <Tab label="Технологии" id="simple-tab-2" aria-controls="simple-tabpanel-2" />
        </Tabs>
      </Box>

      {/* Вкладка обзора */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          {/* Статистические карточки */}
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                  <Typography color="text.secondary" variant="body2">
                    Завершено
                  </Typography>
                </Box>
                <Typography variant="h4">{stats.completed}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <ScheduleIcon color="info" sx={{ mr: 1 }} />
                  <Typography color="text.secondary" variant="body2">
                    В процессе
                  </Typography>
                </Box>
                <Typography variant="h4">{stats.inProgress}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TrendingUpIcon color="warning" sx={{ mr: 1 }} />
                  <Typography color="text.secondary" variant="body2">
                    Запланировано
                  </Typography>
                </Box>
                <Typography variant="h4">{stats.planned}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" variant="body2" gutterBottom>
                  Общий прогресс
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {completionPercentage}%
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={completionPercentage}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Недавно добавленные технологии */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Недавно добавленные
                </Typography>
                <List>
                  {technologies.slice(0, 5).map((tech) => (
                    <ListItem key={tech.id}>
                      <ListItemText
                        primary={tech.title}
                        secondary={
                          <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                            <Chip
                              label={tech.category}
                              size="small"
                              variant="outlined"
                            />
                            <Chip
                              label={getStatusText(tech.status)}
                              size="small"
                              color={getStatusColor(tech.status)}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Распределение по категориям */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  По категориям
                </Typography>
                <List>
                  {categories.map(category => {
                    const count = technologies.filter(t => t.category === category).length;
                    return count > 0 ? (
                      <ListItem key={category}>
                        <ListItemText
                          primary={category}
                          secondary={`${count} технологий`}
                        />
                        <Chip label={count} size="small" />
                      </ListItem>
                    ) : null;
                  })}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Вкладка статистики */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h4" gutterBottom>
          Детальная статистика
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Общая информация
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography><strong>Всего технологий:</strong> {stats.total}</Typography>
                    <Typography><strong>Завершено:</strong> {stats.completed}</Typography>
                    <Typography><strong>Процент выполнения:</strong> {completionPercentage}%</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography><strong>В процессе:</strong> {stats.inProgress}</Typography>
                    <Typography><strong>Запланировано:</strong> {stats.planned}</Typography>
                    <Typography><strong>Приостановлено:</strong> {stats.paused}</Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Прогресс по категориям */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Прогресс по категориям
                </Typography>
                {categories.map(category => {
                  const catTechs = technologies.filter(t => t.category === category);
                  const catCompleted = catTechs.filter(t => t.status === 'completed').length;
                  const catProgress = catTechs.length > 0 
                    ? Math.round((catCompleted / catTechs.length) * 100)
                    : 0;
                  
                  return catTechs.length > 0 ? (
                    <Box key={category} sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">{category}</Typography>
                        <Typography variant="body2">{catProgress}% ({catCompleted}/{catTechs.length})</Typography>
                      </Box>
                      <LinearProgress
                        variant="determinate"
                        value={catProgress}
                        sx={{ height: 6, borderRadius: 3 }}
                      />
                    </Box>
                  ) : null;
                })}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Вкладка технологий */}
      <TabPanel value={tabValue} index={2}>
        <Typography variant="h4" gutterBottom>
          Все технологии
        </Typography>
        <Grid container spacing={2}>
          {technologies.map((tech) => (
            <Grid item xs={12} sm={6} md={4} key={tech.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {tech.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {tech.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    <Chip
                      label={tech.category}
                      size="small"
                      variant="outlined"
                    />
                    <Chip
                      label={getStatusText(tech.status)}
                      size="small"
                      color={getStatusColor(tech.status)}
                    />
                    <Chip
                      label={`${tech.progress}%`}
                      size="small"
                    />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption">
                      {tech.startedAt && `Начало: ${tech.startedAt}`}
                    </Typography>
                    <Typography variant="caption">
                      {tech.completedAt && `Завершено: ${tech.completedAt}`}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>
    </Box>
  );
}

export default Dashboard;