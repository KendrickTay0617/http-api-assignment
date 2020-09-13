const respondJSON = (request, response, status, object, type) => {
  if (type[0] === 'text/xml') {
    let xmlString = '<response>';
    const keys = Object.keys(object);
    for (let i = 0; i < keys.length; i++) {
      xmlString += `<${keys[i]}>${object[keys[i]]}</${keys[i]}>`;
    }
    xmlString += '</response>';

    response.writeHead(status, {
      'Content-Type': 'text/xml',
    });
    response.write(xmlString);
    response.end();
    return;
  }

  response.writeHead(status, {
    'Content-Type': 'application/json',
  });
  response.write(JSON.stringify(object));
  response.end();
};

const success = (request, response, params, type) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  respondJSON(request, response, 200, responseJSON, type);
};

const badRequest = (request, response, params, type) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON, type);
  }

  return respondJSON(request, response, 200, responseJSON, type);
};

const unauthorized = (request, response, params, type) => {
  const responseJSON = {
    message: 'This request has the required parameters',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    responseJSON.id = 'unauthorized';
    return respondJSON(request, response, 401, responseJSON, type);
  }

  return respondJSON(responseJSON, response, 200, responseJSON, type);
};

const forbidden = (request, response, params, type) => {
  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };

  respondJSON(request, response, 403, responseJSON, type);
};

const internal = (request, response, params, type) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  respondJSON(request, response, 500, responseJSON, type);
};

const notImplemented = (request, response, params, type) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  respondJSON(request, response, 501, responseJSON, type);
};

const notFound = (request, response, params, type) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON, type);
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
