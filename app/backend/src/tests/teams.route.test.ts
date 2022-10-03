import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/teams';

import { Response } from 'superagent';


chai.use(chaiHttp);

const { expect } = chai;

const mockTeams = [
  {
    id: 8,
    teamName: 'time do bill'
  },
  {
    id: 9,
    teamName: 'time do filho do bill'
  },
  {
    id: 10,
    teamName: 'time da esposa do bill'
  },
];

const mockTeam = {
  id: 3,
  teamName: 'time do bill'
}

describe('testa rota /teams', () => {
  describe('/GET', () => {
    describe('retorna todos os times', () => {
      let chaiHttpResponse: Response;

      before(async () => {
        sinon.stub(Teams, 'findAll').resolves(mockTeams as Teams[]);
      })

      after(() => {
        (Teams.findAll as sinon.SinonStub).restore();
      })

      it('retorna um status 200', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/teams');

        expect(chaiHttpResponse.status).to.be.eq(200);
      });

      it('o retorno é um array de times', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/teams')

      expect(chaiHttpResponse.body).to.be.deep.equal(mockTeams);
      expect(chaiHttpResponse.body).to.be.an('array');
      });
    })
  })
  describe('/GET /:id', () => {
    describe('retorna um time pelo id', () => {
      let chaiHttpResponse: Response;

      before(async () => {
        sinon.stub(Teams, 'findByPk').resolves(mockTeam as Teams);
      })

      after(() => {
        (Teams.findByPk as sinon.SinonStub).restore();
      })

      it('retorna um status 200', async () => {
        chaiHttpResponse = await chai
          .request(app)
          .get('/teams/3');

        expect(chaiHttpResponse.status).to.be.eq(200);
      });

      it('o retorno é um objeto com o time', async () => {
        chaiHttpResponse = await chai
        .request(app)
        .get('/teams/3');

        expect(chaiHttpResponse.body).to.be.deep.equal(mockTeam);
        expect(chaiHttpResponse.body).to.be.an('object');
      })
    })
  })
})