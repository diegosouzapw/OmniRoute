import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import app from '../src/index';
import db from '../src/db';

beforeEach(() => {
  db._resetState({ users: [], companies: [], accounts: [], ledgers: [], transactions: [], budgets: [], audits: [] });
});

describe('companies route error paths', () => {
  it('allows create without auth and preserves name', async () => {
    const res = await request(app).post('/api/companies').send({ name: 'NoAuthCo' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('name', 'NoAuthCo');
  });

  it('accepts missing name and falls back to Unnamed', async () => {
    const reg = await request(app).post('/api/auth/register').send({ email: 'c1@example.com', password: 'Password123!', role: 'employee' });
    expect(reg.status).toBe(201);
    const login = await request(app).post('/api/auth/login').send({ email: 'c1@example.com', password: 'Password123!' });
    expect(login.status).toBe(200);
    const token = login.body.token;

    const res = await request(app).post('/api/companies').set('Authorization', `Bearer ${token}`).send({});
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('name', 'Unnamed');
  });

  it('returns 404 for get/put/delete on missing company (no id route implemented)', async () => {
    const g = await request(app).get('/api/companies/999');
    expect(g.status).toBe(404);

    const reg = await request(app).post('/api/auth/register').send({ email: 'c2@example.com', password: 'Password123!', role: 'employee' });
    expect(reg.status).toBe(201);
    const login = await request(app).post('/api/auth/login').send({ email: 'c2@example.com', password: 'Password123!' });
    expect(login.status).toBe(200);
    const token = login.body.token;

    const p = await request(app).put('/api/companies/999').set('Authorization', `Bearer ${token}`).send({ name: 'X' });
    expect(p.status).toBe(404);

    const d = await request(app).delete('/api/companies/999').set('Authorization', `Bearer ${token}`);
    expect(d.status).toBe(404);
  });

  it('create exists; update/delete routes are not implemented (expect 404)', async () => {
    const reg = await request(app).post('/api/auth/register').send({ email: 'adminco@example.com', password: 'Password123!', role: 'admin' });
    expect(reg.status).toBe(201);
    const login = await request(app).post('/api/auth/login').send({ email: 'adminco@example.com', password: 'Password123!' });
    expect(login.status).toBe(200);
    const token = login.body.token;

    const cr = await request(app).post('/api/companies').set('Authorization', `Bearer ${token}`).send({ name: 'Acme' });
    expect(cr.status).toBe(201);
    const id = cr.body.id;

    // Since PUT/DELETE routes are not implemented in the companies router, expect 404
    const bad = await request(app).put(`/api/companies/${id}`).set('Authorization', `Bearer ${token}`).send({ name: '' });
    expect(bad.status).toBe(404);

    const up = await request(app).put(`/api/companies/${id}`).set('Authorization', `Bearer ${token}`).send({ name: 'Acme Co' });
    expect(up.status).toBe(404);

    const del = await request(app).delete(`/api/companies/${id}`).set('Authorization', `Bearer ${token}`);
    expect(del.status).toBe(404);
  });
});
