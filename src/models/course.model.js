import { DataTypes } from 'sequelize';
import { sequelize } from '../db/index.js'; // Adjust the import according to your setup

// Define Instructor model
const Instructor = sequelize.define('instructor', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
}, {
  timestamps: true
});

// Define Course model
const Course = sequelize.define('courses', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  instructorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Instructors', // 'Instructors' refers to the table name
      key: 'id'
    }
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'categories', // 'Categories' refers to the table name
      key: 'id'
    }
  },
  duration: {
    type: DataTypes.INTEGER,
  },
  language: {
    type:DataTypes.STRING, // Array of strings
    allowNull: false,
  },
  level : {
    type : DataTypes.STRING,
  },
  type : {
    type:DataTypes.STRING 
  },
  longdescription: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true
});

// Define Lesson model
const Lesson = sequelize.define('Lesson', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  videoUrl: {
    type: DataTypes.STRING
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'courses',
      key: 'id'
    }
  }
}, {
  timestamps: true
});

// Define Category model
const Category = sequelize.define('categories', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true
});

// Define Review model
const Review = sequelize.define('Review', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // 'Users' refers to the table name
      key: 'id'
    }
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  comment: {
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  courseId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'courses',
      key: 'id'
    }
  }
}, {
  timestamps: false
});

// Model associations
Instructor.hasMany(Course, { foreignKey: 'instructorId' });
Course.belongsTo(Instructor, { foreignKey: 'instructorId' });

Course.belongsTo(Category, { foreignKey: 'categoryId' });
Category.hasMany(Course, { foreignKey: 'categoryId' });

Course.hasMany(Lesson, { foreignKey: 'courseId' });
Lesson.belongsTo(Course, { foreignKey: 'courseId' });

Course.hasMany(Review, { foreignKey: 'courseId' });
Review.belongsTo(Course, { foreignKey: 'courseId' });

export { Instructor, Course, Lesson, Review, Category };
