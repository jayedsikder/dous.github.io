const { spawn } = require('child_process');
const path = require('path');
const request = require('supertest');

// Allow more time for starting the server
this.timeout?.(5000);

describe('project.js server', function() {
  let serverProcess;

  before(function(done) {
    serverProcess = spawn('node', [path.join(__dirname, '..', 'project.js')], {
      stdio: 'inherit'
    });
    // wait a moment for the server to start
    setTimeout(done, 1000);
  });

  after(function() {
    if (serverProcess) serverProcess.kill();
  });

  it('returns 404 for missing file', function(done) {
    request('http://localhost:8080')
      .get('/non-existent-file')
      .expect(404, done);
  });
});
