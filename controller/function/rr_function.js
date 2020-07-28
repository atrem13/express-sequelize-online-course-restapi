rs = (res, data) => {
  return res.status(200).json({
    status:'ok',
    data:data
  });
};

re = (res, err, code = 500, action = '') => {
  let err_code = code;
  let error = err | action;
  return res.status(err_code).json({
    status: 'error',
    error: 'occur error: '+ error
  });
};

module.exports = {rs, re};