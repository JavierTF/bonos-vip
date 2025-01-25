function authMiddleware(req, res, next) {
  const userSession = localStorage.getItem('bonos-vip');

  if (!userSession) {
    return res.redirect('/login');
  }

  try {
    const { user } = JSON.parse(userSession);
    req.user = user;
    
    const isAdminRoute = req.path.startsWith('/admin');
    if (isAdminRoute && user.role !== 'admin') {
      return res.redirect('/');
    }

    next();
  } catch (error) {
    console.log(error);
    localStorage.removeItem('bonos-vip');
    return res.redirect('/login');
  }
}

module.exports = { authMiddleware };