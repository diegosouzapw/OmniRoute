/*
 * Spike: minimal N-API addon to create a TPROXY IP_TRANSPARENT listening socket.
 *
 * Node's net module cannot setsockopt(IP_TRANSPARENT) before bind(), which TPROXY
 * requires (otherwise the kernel drops the redirected packets). This addon does
 * socket()+SO_REUSEADDR+IP_TRANSPARENT+bind()+listen() and returns the raw fd;
 * Node then adopts it via `server.listen({ fd })`. On each accepted connection,
 * socket.localAddress/localPort report the ORIGINAL destination (TPROXY preserves
 * it via getsockname), so no SO_ORIGINAL_DST / NAT is needed.
 *
 * Pure C N-API (node_api.h) — no node-addon-api dependency.
 */
#include <node_api.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netinet/ip.h>
#include <arpa/inet.h>
#include <string.h>
#include <unistd.h>
#include <errno.h>
#include <fcntl.h>

#define THROW(env, code, msg) do { napi_throw_error((env), (code), (msg)); return NULL; } while (0)

static napi_value CreateTransparentListener(napi_env env, napi_callback_info info) {
  size_t argc = 2;
  napi_value argv[2];
  napi_get_cb_info(env, info, &argc, argv, NULL, NULL);

  char ip[64] = {0};
  size_t ip_len = 0;
  napi_get_value_string_utf8(env, argv[0], ip, sizeof(ip), &ip_len);
  int32_t port = 0;
  napi_get_value_int32(env, argv[1], &port);

  int fd = socket(AF_INET, SOCK_STREAM, 0);
  if (fd < 0) THROW(env, "ESOCKET", strerror(errno));

  int one = 1;
  if (setsockopt(fd, SOL_SOCKET, SO_REUSEADDR, &one, sizeof(one)) < 0) {
    close(fd); THROW(env, "ESO_REUSEADDR", strerror(errno));
  }
  /* The critical, Node-unsupported option. Requires CAP_NET_ADMIN. */
  if (setsockopt(fd, SOL_IP, IP_TRANSPARENT, &one, sizeof(one)) < 0) {
    int e = errno; close(fd); THROW(env, "EIP_TRANSPARENT", strerror(e));
  }

  struct sockaddr_in addr;
  memset(&addr, 0, sizeof(addr));
  addr.sin_family = AF_INET;
  addr.sin_port = htons((uint16_t)port);
  if (inet_pton(AF_INET, ip, &addr.sin_addr) != 1) {
    close(fd); THROW(env, "EADDR", "invalid IPv4 address");
  }
  if (bind(fd, (struct sockaddr *)&addr, sizeof(addr)) < 0) {
    int e = errno; close(fd); THROW(env, "EBIND", strerror(e));
  }
  if (listen(fd, 511) < 0) {
    int e = errno; close(fd); THROW(env, "ELISTEN", strerror(e));
  }

  napi_value result;
  napi_create_int32(env, fd, &result);
  return result;
}

/*
 * setSocketMark(fd, mark): set SO_MARK on an existing socket fd. Anti-loop for
 * the OUTPUT-based TPROXY recipe — the proxy marks its OWN upstream connections
 * so the mangle OUTPUT rule (`-m mark ! --mark <bypass>`) excludes them and they
 * are not re-intercepted. Requires CAP_NET_ADMIN. Returns undefined; throws on
 * failure.
 */
static napi_value SetSocketMark(napi_env env, napi_callback_info info) {
  size_t argc = 2;
  napi_value argv[2];
  napi_get_cb_info(env, info, &argc, argv, NULL, NULL);
  int32_t fd = -1, mark = 0;
  napi_get_value_int32(env, argv[0], &fd);
  napi_get_value_int32(env, argv[1], &mark);
  if (setsockopt(fd, SOL_SOCKET, SO_MARK, &mark, sizeof(mark)) < 0) {
    THROW(env, "ESO_MARK", strerror(errno));
  }
  return NULL;
}

/*
 * connectMarked(ip, port, mark): create a socket, set SO_MARK BEFORE connect so
 * the SYN itself carries the mark, then start a non-blocking connect. Returns
 * the fd (connect in progress). This is the anti-loop for the forward path: the
 * proxy's upstream SYN is excluded by the OUTPUT rule (`-m mark ! --mark`), so
 * the forward does not re-enter TPROXY. The caller adopts the fd into a Node
 * socket and waits for it to become writable. Requires CAP_NET_ADMIN.
 */
static napi_value ConnectMarked(napi_env env, napi_callback_info info) {
  size_t argc = 3;
  napi_value argv[3];
  napi_get_cb_info(env, info, &argc, argv, NULL, NULL);
  char ip[64] = {0};
  size_t ip_len = 0;
  napi_get_value_string_utf8(env, argv[0], ip, sizeof(ip), &ip_len);
  int32_t port = 0, mark = 0;
  napi_get_value_int32(env, argv[1], &port);
  napi_get_value_int32(env, argv[2], &mark);

  int fd = socket(AF_INET, SOCK_STREAM, 0);
  if (fd < 0) THROW(env, "ESOCKET", strerror(errno));
  if (setsockopt(fd, SOL_SOCKET, SO_MARK, &mark, sizeof(mark)) < 0) {
    int e = errno; close(fd); THROW(env, "ESO_MARK", strerror(e));
  }
  int flags = fcntl(fd, F_GETFL, 0);
  if (flags < 0 || fcntl(fd, F_SETFL, flags | O_NONBLOCK) < 0) {
    int e = errno; close(fd); THROW(env, "EFCNTL", strerror(e));
  }
  struct sockaddr_in addr;
  memset(&addr, 0, sizeof(addr));
  addr.sin_family = AF_INET;
  addr.sin_port = htons((uint16_t)port);
  if (inet_pton(AF_INET, ip, &addr.sin_addr) != 1) {
    close(fd); THROW(env, "EADDR", "invalid IPv4 address");
  }
  int r = connect(fd, (struct sockaddr *)&addr, sizeof(addr));
  if (r < 0 && errno != EINPROGRESS) {
    int e = errno; close(fd); THROW(env, "ECONNECT", strerror(e));
  }
  napi_value result;
  napi_create_int32(env, fd, &result);
  return result;
}

static napi_value Init(napi_env env, napi_value exports) {
  napi_value fn;
  napi_create_function(env, "createTransparentListener", NAPI_AUTO_LENGTH,
                       CreateTransparentListener, NULL, &fn);
  napi_set_named_property(env, exports, "createTransparentListener", fn);

  napi_value markFn;
  napi_create_function(env, "setSocketMark", NAPI_AUTO_LENGTH, SetSocketMark, NULL, &markFn);
  napi_set_named_property(env, exports, "setSocketMark", markFn);

  napi_value connFn;
  napi_create_function(env, "connectMarked", NAPI_AUTO_LENGTH, ConnectMarked, NULL, &connFn);
  napi_set_named_property(env, exports, "connectMarked", connFn);
  return exports;
}

NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
