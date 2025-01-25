/** @format */

import z from 'zod';

const passwordSchema = (password: string, ctx: z.RefinementCtx) => {
  const containsUppercase = (ch: string) => /[A-Z]/.test(ch);
  const containsLowercase = (ch: string) => /[a-z]/.test(ch);
  const containsSymbol = (ch: string) =>
    /[`!@#$%^&*())_\-+=\[\]{};':"\\|,.<>\/?~ ]/.test(ch);
  const containsNumber = (ch: string) => /\d/.test(ch);

  let countNumbers = 0;
  let countLowercase = 0;
  let countUppercase = 0;
  let countSymbol = 0;

  for (let i = 0; i < password.length; i++) {
    let ch = password.charAt(i);

    if (containsNumber(ch)) countNumbers++;
    else if (containsUppercase(ch)) countUppercase++;
    else if (containsLowercase(ch)) countLowercase++;
    else if (containsSymbol(ch)) countSymbol++;
  }

  if (countLowercase < 1) {
    ctx.addIssue({
      code: 'custom',
      message: 'password should have atleast one lowercase alphabet',
    });
  } else if (countUppercase < 1) {
    ctx.addIssue({
      code: 'custom',
      message: 'password should have atleast one uppercase alphabet',
    });
  } else if (countNumbers < 1) {
    ctx.addIssue({
      code: 'custom',
      message: 'password should have number alphabet',
    });
  } else if (countSymbol < 1) {
    ctx.addIssue({
      code: 'custom',
      message: 'password should have a symbol alphabet',
    });
  }
};

const signupInput = z
  .object({
    email: z.string().email(),
    username: z.string(),
    password: z.string().min(6),
  })
  .superRefine(({ password }, ctx) => passwordSchema(password, ctx));

export type signupInput = z.infer<typeof signupInput>;

const signinInput = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  .superRefine(({ password }, ctx) => passwordSchema(password, ctx));

export type signinInput = z.infer<typeof signinInput>;

export { signinInput, signupInput };
