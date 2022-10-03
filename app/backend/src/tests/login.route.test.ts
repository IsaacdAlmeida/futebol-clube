import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const validUser = {
    email: 'borabill@gmail.com',
    password: bcrypt.hashSync('borafilhodobill')
}

const emptyUser = {
  email: '',
  password: bcrypt.hashSync('borafilhodobill')
}

describe('testa rota login', () => {
  describe('/POST', () => {
    describe('login com usuário válido', () => {
      let chaiHttpResponse: Response;

      before(async () => {
        sinon.stub(User, 'findOne').resolves(validUser as User)
      })

      after(() => {
        (User.findOne as sinon.SinonStub).restore();
      })

      it('retorna um status 200', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
            email: 'borabill@gmail.com',
            password: 'borafilhodobill'
          })

        expect(chaiHttpResponse.status).to.be.eq(200);
      });

      it('o body tem um token', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
            email: 'borabill@gmail.com',
            password: 'borafilhodobill'
          })

        expect(chaiHttpResponse.body).to.have.property('token');
      });

    })
    describe('login com usuário ou senhas inválidos', () => {
      let chaiHttpResponse: Response;

      before(async () => {
        sinon.stub(User, 'findOne').resolves(emptyUser as User)
      })

      after(() => {
        (User.findOne as sinon.SinonStub).restore();
      })

      it('retorna um status 400', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
            email: '',
            password: 'borafilhodobill'
          })

        expect(chaiHttpResponse.status).to.be.eq(400);
      });

      it('o body tem uma mensagem de erro', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .post('/login')
          .send({
            email: '',
            password: 'borafilhodobill'
          })

        expect(chaiHttpResponse.body).to.have.property('message');
      });
    })
  });
})

