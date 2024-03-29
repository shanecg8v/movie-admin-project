import { rest } from 'msw';

export const handlers = [
  rest.get('/api/auth', (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        status: 'suss',
        data: 'test',
      })
    );
  }),
];
