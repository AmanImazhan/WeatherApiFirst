# Weather API — Clean Architecture (Node.js + Express)

Простой и чистый бэкенд для получения погоды по названию города.

## Особенности
- Чистая архитектура (слойность)
- Валидация запросов
- Централизованная обработка ошибок
- Работа с внешним API (OpenWeatherMap)
- Готов к продакшену и масштабированию

## Запуск

```bash
git clone https://github.com/ТвойНик/weather-api-project.git
cd weather-api-project
cp .env.example .env        
npm install
npm run dev