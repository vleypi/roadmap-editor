export const EXAMPLE_ROADMAP_DATA = {
    title: "Product Development Roadmap",
    description: "Example roadmap with dependencies and milestones",
    nodes: [
      {
        "id": "node-1",
        "title": "Исследование и планирование",
        "description": "Анализ существующих решений, определение функциональных требований и архитектуры",
        "type": "Research",
        "color": "#8b5cf6",
        "x": -556.7650074168562,
        "y": -786.4909457784408,
        "progress": 100,
        "tags": [
          "Анализ",
          "Архитектура"
        ],
        "priority": "Высокий"
      },
      {
        "id": "node-2",
        "title": "Настройка проекта React/Next.js",
        "description": "Инициализация проекта, настройка TypeScript, Tailwind CSS и базовой структуры",
        "type": "Setup",
        "color": "#3b82f6",
        "x": -574.6648447858072,
        "y": -424.76577244633717,
        "progress": 100,
        "tags": [
          "React",
          "Next.js",
          "TypeScript"
        ],
        "priority": "Высокий"
      },
      {
        "id": "node-3",
        "title": "Реализация Zustand store",
        "description": "Создание глобального состояния для узлов, соединений и viewport",
        "type": "Backend",
        "color": "#10b981",
        "x": -346.2307400565389,
        "y": -58.67802993447597,
        "progress": 100,
        "tags": [
          "Zustand",
          "Состояние"
        ],
        "priority": "Высокий"
      },
      {
        "id": "node-4",
        "title": "Компонент CanvasArea",
        "description": "Разработка основного канваса с возможностью перетаскивания и масштабирования",
        "type": "Feature",
        "color": "#f59e0b",
        "x": 119.28391107271177,
        "y": -41.50784840598796,
        "progress": 100,
        "tags": [
          "Canvas",
          "Drag&Drop"
        ],
        "priority": "Высокий"
      },
      {
        "id": "node-5",
        "title": "Визуализация узлов",
        "description": "Создание компонентов узлов с цветами, прогрессом и метками",
        "type": "UI",
        "color": "#ec4899",
        "x": 574.624959751605,
        "y": -65.48032622276577,
        "progress": 100,
        "tags": [
          "Компоненты",
          "UI"
        ],
        "priority": "Средний"
      },
      {
        "id": "node-6",
        "title": "Система соединений",
        "description": "Реализация линий соединения между узлами с разными типами",
        "type": "Feature",
        "color": "#6366f1",
        "x": 16.37371591578153,
        "y": 391.9080329225655,
        "progress": 100,
        "tags": [
          "Соединения",
          "Графика"
        ],
        "priority": "Высокий"
      },
      {
        "id": "node-7",
        "title": "Контекстное меню",
        "description": "Создание контекстного меню для канваса и узлов",
        "type": "UI",
        "color": "#06b6d4",
        "x": 422.9955661257797,
        "y": 397.6616120867669,
        "progress": 100,
        "tags": [
          "UX",
          "Меню"
        ],
        "priority": "Средний"
      },
      {
        "id": "node-8",
        "title": "Панель свойств",
        "description": "Разработка правой панели для редактирования свойств узла",
        "type": "UI",
        "color": "#84cc16",
        "x": 803.9258213671809,
        "y": 304.4206997877288,
        "progress": 100,
        "tags": [
          "Редактирование",
          "Свойства"
        ],
        "priority": "Высокий"
      },
      {
        "id": "node-9",
        "title": "Панель JSON",
        "description": "Создание панели для просмотра и экспорта JSON данных",
        "type": "Feature",
        "color": "#d946ef",
        "x": -466.5570149658521,
        "y": 340.5924589537049,
        "progress": 100,
        "tags": [
          "JSON",
          "Экспорт"
        ],
        "priority": "Средний"
      },
      {
        "id": "node-10",
        "title": "Загрузка файлов",
        "description": "Реализация drag & drop загрузки JSON файлов",
        "type": "Feature",
        "color": "#ef4444",
        "x": -595.9279625035475,
        "y": 753.8782731950847,
        "progress": 100,
        "tags": [
          "Файлы",
          "Импорт"
        ],
        "priority": "Высокий"
      },
      {
        "id": "node-11",
        "title": "Экспорт данных",
        "description": "Добавление возможности экспорта roadmap в JSON формат",
        "type": "Feature",
        "color": "#f97316",
        "x": -179.26204626811915,
        "y": 725.8808792111058,
        "progress": 100,
        "tags": [
          "Экспорт",
          "JSON"
        ],
        "priority": "Высокий"
      },
      {
        "id": "node-12",
        "title": "Адаптивный дизайн",
        "description": "Оптимизация интерфейса для разных размеров экрана",
        "type": "UI",
        "color": "#22c55e",
        "x": 1111.6089143542326,
        "y": 70.82369457723773,
        "progress": 100,
        "tags": [
          "Адаптивность",
          "Дизайн"
        ],
        "priority": "Средний"
      },
      {
        "id": "node-13",
        "title": "Тестирование",
        "description": "Тестирование функциональности и исправление ошибок",
        "type": "Testing",
        "color": "#a855f7",
        "x": -1045.8851683931512,
        "y": -53.367129384996076,
        "progress": 90,
        "tags": [
          "QA",
          "Тестирование"
        ],
        "priority": "Высокий"
      },
      {
        "id": "node-14",
        "title": "Документация",
        "description": "Написание документации по использованию приложения",
        "type": "Documentation",
        "color": "#3b82f6",
        "x": -1550.3782768500523,
        "y": 422.3726525165837,
        "progress": 80,
        "tags": [
          "Документация",
          "Руководство"
        ],
        "priority": "Средний"
      },
      {
        "id": "node-15",
        "title": "Развертывание",
        "description": "Деплой приложения на хостинг и настройка CI/CD",
        "type": "Deployment",
        "color": "#10b981",
        "x": -1004.5669763098688,
        "y": 437.5789002395817,
        "progress": 70,
        "tags": [
          "Деплой",
          "CI/CD"
        ],
        "priority": "Высокий"
      },
      {
        "id": "node-16",
        "title": "Сбор фидбека",
        "description": "Сбор отзывов пользователей и планирование улучшений",
        "type": "Feedback",
        "color": "#f59e0b",
        "x": -1025.4491739091336,
        "y": 957.3609247539374,
        "progress": 30,
        "tags": [
          "Фидбек",
          "Улучшения"
        ],
        "priority": "Низкий"
      }
    ],
    "connections": [
      {
        "id": "conn-1",
        "sourceId": "node-1",
        "targetId": "node-2",
        "type": "dependency",
        "label": "основа для"
      },
      {
        "id": "conn-2",
        "sourceId": "node-2",
        "targetId": "node-3",
        "type": "dependency",
        "label": "требует"
      },
      {
        "id": "conn-3",
        "sourceId": "node-3",
        "targetId": "node-4",
        "type": "dependency",
        "label": "используется в"
      },
      {
        "id": "conn-4",
        "sourceId": "node-4",
        "targetId": "node-5",
        "type": "dependency",
        "label": "включает"
      },
      {
        "id": "conn-5",
        "sourceId": "node-4",
        "targetId": "node-6",
        "type": "dependency",
        "label": "работает с"
      },
      {
        "id": "conn-6",
        "sourceId": "node-4",
        "targetId": "node-7",
        "type": "dependency",
        "label": "дополняет"
      },
      {
        "id": "conn-7",
        "sourceId": "node-5",
        "targetId": "node-8",
        "type": "related",
        "label": "связано с"
      },
      {
        "id": "conn-8",
        "sourceId": "node-3",
        "targetId": "node-9",
        "type": "dependency",
        "label": "предоставляет данные для"
      },
      {
        "id": "conn-9",
        "sourceId": "node-9",
        "targetId": "node-11",
        "type": "dependency",
        "label": "основа для"
      },
      {
        "id": "conn-10",
        "sourceId": "node-9",
        "targetId": "node-10",
        "type": "related",
        "label": "взаимосвязано"
      },
      {
        "id": "conn-11",
        "sourceId": "node-5",
        "targetId": "node-12",
        "type": "dependency",
        "label": "оптимизируется через"
      },
      {
        "id": "conn-12",
        "sourceId": "node-2",
        "targetId": "node-13",
        "type": "dependency",
        "label": "тестируется"
      },
      {
        "id": "conn-13",
        "sourceId": "node-3",
        "targetId": "node-13",
        "type": "dependency",
        "label": "тестируется"
      },
      {
        "id": "conn-15",
        "sourceId": "node-13",
        "targetId": "node-14",
        "type": "dependency",
        "label": "документируется в"
      },
      {
        "id": "conn-16",
        "sourceId": "node-13",
        "targetId": "node-15",
        "type": "dependency",
        "label": "развертывается после"
      },
      {
        "id": "conn-17",
        "sourceId": "node-15",
        "targetId": "node-16",
        "type": "dependency",
        "label": "позволяет"
      }
    ],
    "viewport": {
      "scale": 0.34760971265398677,
      "x": 949.5853436568868,
      "y": 424.88262842139466
    }
  }