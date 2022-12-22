export async function loginUser(email, password) {
  // POST /auth/login
  return {
    code: 200,
    result: { token: 'abc' },
    error: null,
  };
  // return {
  //   code: 400,
  //   result: null,
  //   error: 'Something went wrong.',
  // };
}
