import { INTEGER, STRING, Model } from 'sequelize';
import db from '.';

class User extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!:string;
  password!: string;
}

// .init inicializa um model, representando uma tabela no DB, com os att e options. as colunas são definidas
// https://github.com/tryber/sd-020-a-live-lectures/blob/revision-sequelize-ts/src/database/models/clinic.ts
User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: STRING,
    allowNull: false,
  },
  role: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'users',
  underscored: true,
  timestamps: false,
});

export default User;
