export const POSTGRES_BOOTSTRAP_VERSION = 3;

export const POSTGRES_BOOTSTRAP_LOCK_KEY = 7211001;

const TS_FORMAT = "YYYY-MM-DD HH24:MI:SS";

function baseTimestampFunctions(): string {
  return `
CREATE OR REPLACE FUNCTION omniroute_julian_to_ts(jd double precision) RETURNS timestamp LANGUAGE sql IMMUTABLE AS $f$
  SELECT (to_timestamp((jd - 2440587.5) * 86400) AT TIME ZONE 'utc')
$f$;

CREATE OR REPLACE FUNCTION omniroute_numeric_ts(v double precision, mods text[]) RETURNS timestamp LANGUAGE sql IMMUTABLE AS $f$
  SELECT CASE
    WHEN v IS NULL THEN NULL
    WHEN 'unixepoch' = ANY(SELECT lower(btrim(m)) FROM unnest(COALESCE(mods, '{}'::text[])) m) THEN (to_timestamp(v) AT TIME ZONE 'utc')
    WHEN 'auto' = ANY(SELECT lower(btrim(m)) FROM unnest(COALESCE(mods, '{}'::text[])) m) AND v > 5373484.5 THEN (to_timestamp(v) AT TIME ZONE 'utc')
    ELSE omniroute_julian_to_ts(v)
  END
$f$;

CREATE OR REPLACE FUNCTION omniroute_parse_ts(v text, mods text[]) RETURNS timestamp LANGUAGE plpgsql STABLE AS $f$
DECLARE s text;
BEGIN
  IF v IS NULL THEN RETURN NULL; END IF;
  s := btrim(v);
  IF s = '' THEN RETURN NULL; END IF;
  IF lower(s) = 'now' THEN RETURN (now() AT TIME ZONE 'utc'); END IF;
  IF s ~ '^[+-]?[0-9]+(\\.[0-9]+)?$' THEN RETURN omniroute_numeric_ts(s::double precision, mods); END IF;
  BEGIN
    RETURN (s::timestamptz AT TIME ZONE 'utc');
  EXCEPTION WHEN OTHERS THEN
    RETURN NULL;
  END;
END
$f$;

CREATE OR REPLACE FUNCTION omniroute_apply_modifiers(ts timestamp, mods text[]) RETURNS timestamp LANGUAGE plpgsql IMMUTABLE AS $f$
DECLARE
  m text;
  lm text;
  parts text[];
  result timestamp := ts;
BEGIN
  IF result IS NULL OR mods IS NULL THEN RETURN result; END IF;
  FOREACH m IN ARRAY mods LOOP
    CONTINUE WHEN m IS NULL;
    lm := lower(btrim(m));
    IF lm IN ('localtime', 'utc', 'unixepoch', 'julianday', 'auto', 'subsec', 'subsecond') THEN CONTINUE; END IF;
    IF lm = 'start of day' THEN result := date_trunc('day', result); CONTINUE; END IF;
    IF lm = 'start of month' THEN result := date_trunc('month', result); CONTINUE; END IF;
    IF lm = 'start of year' THEN result := date_trunc('year', result); CONTINUE; END IF;
    parts := regexp_match(lm, '^([+-]?[0-9]+(?:\\.[0-9]+)?)\\s*(second|minute|hour|day|month|year)s?$');
    IF parts IS NOT NULL THEN
      result := result + (parts[1] || ' ' || parts[2])::interval;
      CONTINUE;
    END IF;
    parts := regexp_match(lm, '^weekday ([0-6])$');
    IF parts IS NOT NULL THEN
      result := result + ((parts[1]::int - EXTRACT(DOW FROM result)::int + 7) % 7) * interval '1 day';
      CONTINUE;
    END IF;
    parts := regexp_match(lm, '^([+-])?([0-9]{1,2}):([0-9]{2})(?::([0-9]{2}))?$');
    IF parts IS NOT NULL THEN
      result := result + (CASE WHEN parts[1] = '-' THEN -1 ELSE 1 END) * make_interval(hours => parts[2]::int, mins => parts[3]::int, secs => COALESCE(parts[4]::int, 0));
      CONTINUE;
    END IF;
  END LOOP;
  RETURN result;
END
$f$;

CREATE OR REPLACE FUNCTION omniroute_resolve_ts(base text, mods text[]) RETURNS timestamp LANGUAGE sql STABLE AS $f$
  SELECT omniroute_apply_modifiers(omniroute_parse_ts(base, mods), mods)
$f$;

CREATE OR REPLACE FUNCTION omniroute_resolve_ts(base double precision, mods text[]) RETURNS timestamp LANGUAGE sql STABLE AS $f$
  SELECT omniroute_apply_modifiers(omniroute_numeric_ts(base, mods), mods)
$f$;

CREATE OR REPLACE FUNCTION omniroute_format_ts(fmt text, ts timestamp) RETURNS text LANGUAGE plpgsql IMMUTABLE AS $f$
DECLARE
  result text := '';
  i int := 1;
  n int;
  c text;
BEGIN
  IF ts IS NULL OR fmt IS NULL THEN RETURN NULL; END IF;
  n := length(fmt);
  WHILE i <= n LOOP
    c := substr(fmt, i, 1);
    IF c = '%' AND i < n THEN
      i := i + 1;
      c := substr(fmt, i, 1);
      result := result || CASE c
        WHEN 'Y' THEN to_char(ts, 'YYYY')
        WHEN 'm' THEN to_char(ts, 'MM')
        WHEN 'd' THEN to_char(ts, 'DD')
        WHEN 'e' THEN EXTRACT(DAY FROM ts)::int::text
        WHEN 'H' THEN to_char(ts, 'HH24')
        WHEN 'k' THEN EXTRACT(HOUR FROM ts)::int::text
        WHEN 'I' THEN to_char(ts, 'HH12')
        WHEN 'l' THEN ((EXTRACT(HOUR FROM ts)::int + 11) % 12 + 1)::text
        WHEN 'M' THEN to_char(ts, 'MI')
        WHEN 'S' THEN to_char(ts, 'SS')
        WHEN 'f' THEN to_char(ts, 'SS.MS')
        WHEN 'j' THEN to_char(ts, 'DDD')
        WHEN 'J' THEN (EXTRACT(EPOCH FROM ts) / 86400 + 2440587.5)::text
        WHEN 's' THEN floor(EXTRACT(EPOCH FROM ts))::bigint::text
        WHEN 'w' THEN EXTRACT(DOW FROM ts)::int::text
        WHEN 'u' THEN (CASE WHEN EXTRACT(DOW FROM ts)::int = 0 THEN 7 ELSE EXTRACT(DOW FROM ts)::int END)::text
        WHEN 'W' THEN lpad((((EXTRACT(DOY FROM ts)::int - 1) - ((EXTRACT(DOW FROM ts)::int + 6) % 7) + 7) / 7)::text, 2, '0')
        WHEN 'p' THEN to_char(ts, 'AM')
        WHEN 'P' THEN to_char(ts, 'am')
        WHEN 'F' THEN to_char(ts, 'YYYY-MM-DD')
        WHEN 'T' THEN to_char(ts, 'HH24:MI:SS')
        WHEN 'R' THEN to_char(ts, 'HH24:MI')
        WHEN '%' THEN '%'
        ELSE '%' || c
      END;
    ELSE
      result := result || c;
    END IF;
    i := i + 1;
  END LOOP;
  RETURN result;
END
$f$;
`;
}

function dateFunctionOverloads(name: string, format: string): string {
  const body = (expr: string) => `SELECT to_char(${expr}, '${format}')`;
  return `
CREATE OR REPLACE FUNCTION ${name}(base text, VARIADIC mods text[] DEFAULT '{}') RETURNS text LANGUAGE sql STABLE AS $f$
  ${body("omniroute_resolve_ts(base, mods)")}
$f$;
CREATE OR REPLACE FUNCTION ${name}(base bigint, VARIADIC mods text[] DEFAULT '{}') RETURNS text LANGUAGE sql STABLE AS $f$
  ${body("omniroute_resolve_ts(base::double precision, mods)")}
$f$;
CREATE OR REPLACE FUNCTION ${name}(base double precision, VARIADIC mods text[] DEFAULT '{}') RETURNS text LANGUAGE sql STABLE AS $f$
  ${body("omniroute_resolve_ts(base, mods)")}
$f$;
CREATE OR REPLACE FUNCTION ${name}(base numeric, VARIADIC mods text[] DEFAULT '{}') RETURNS text LANGUAGE sql STABLE AS $f$
  ${body("omniroute_resolve_ts(base::double precision, mods)")}
$f$;
`;
}

function timestampFunctions(): string {
  return `
${dateFunctionOverloads("omniroute_datetime", TS_FORMAT)}
${dateFunctionOverloads("omniroute_date", "YYYY-MM-DD")}
${dateFunctionOverloads("omniroute_time", "HH24:MI:SS")}

CREATE OR REPLACE FUNCTION omniroute_strftime(fmt text, base text, VARIADIC mods text[] DEFAULT '{}') RETURNS text LANGUAGE sql STABLE AS $f$
  SELECT omniroute_format_ts(fmt, omniroute_resolve_ts(base, mods))
$f$;
CREATE OR REPLACE FUNCTION omniroute_strftime(fmt text, base bigint, VARIADIC mods text[] DEFAULT '{}') RETURNS text LANGUAGE sql STABLE AS $f$
  SELECT omniroute_format_ts(fmt, omniroute_resolve_ts(base::double precision, mods))
$f$;
CREATE OR REPLACE FUNCTION omniroute_strftime(fmt text, base double precision, VARIADIC mods text[] DEFAULT '{}') RETURNS text LANGUAGE sql STABLE AS $f$
  SELECT omniroute_format_ts(fmt, omniroute_resolve_ts(base, mods))
$f$;
CREATE OR REPLACE FUNCTION omniroute_strftime(fmt text) RETURNS text LANGUAGE sql STABLE AS $f$
  SELECT omniroute_format_ts(fmt, omniroute_resolve_ts('now', '{}'::text[]))
$f$;

CREATE OR REPLACE FUNCTION omniroute_unixepoch(base text, VARIADIC mods text[] DEFAULT '{}') RETURNS bigint LANGUAGE sql STABLE AS $f$
  SELECT floor(EXTRACT(EPOCH FROM omniroute_resolve_ts(base, mods)))::bigint
$f$;
CREATE OR REPLACE FUNCTION omniroute_unixepoch(base bigint, VARIADIC mods text[] DEFAULT '{}') RETURNS bigint LANGUAGE sql STABLE AS $f$
  SELECT floor(EXTRACT(EPOCH FROM omniroute_resolve_ts(base::double precision, mods)))::bigint
$f$;
CREATE OR REPLACE FUNCTION omniroute_unixepoch(base double precision, VARIADIC mods text[] DEFAULT '{}') RETURNS bigint LANGUAGE sql STABLE AS $f$
  SELECT floor(EXTRACT(EPOCH FROM omniroute_resolve_ts(base, mods)))::bigint
$f$;

CREATE OR REPLACE FUNCTION omniroute_julianday(base text, VARIADIC mods text[] DEFAULT '{}') RETURNS double precision LANGUAGE sql STABLE AS $f$
  SELECT EXTRACT(EPOCH FROM omniroute_resolve_ts(base, mods)) / 86400 + 2440587.5
$f$;
CREATE OR REPLACE FUNCTION omniroute_julianday(base bigint, VARIADIC mods text[] DEFAULT '{}') RETURNS double precision LANGUAGE sql STABLE AS $f$
  SELECT EXTRACT(EPOCH FROM omniroute_resolve_ts(base::double precision, mods)) / 86400 + 2440587.5
$f$;
CREATE OR REPLACE FUNCTION omniroute_julianday(base double precision, VARIADIC mods text[] DEFAULT '{}') RETURNS double precision LANGUAGE sql STABLE AS $f$
  SELECT EXTRACT(EPOCH FROM omniroute_resolve_ts(base, mods)) / 86400 + 2440587.5
$f$;
`;
}

function jsonFunctions(): string {
  return `
CREATE OR REPLACE FUNCTION omniroute_try_jsonb(j text) RETURNS jsonb LANGUAGE plpgsql IMMUTABLE AS $f$
BEGIN
  IF j IS NULL THEN RETURN NULL; END IF;
  RETURN j::jsonb;
EXCEPTION WHEN OTHERS THEN
  RETURN NULL;
END
$f$;

CREATE OR REPLACE FUNCTION omniroute_json_path(p text) RETURNS text[] LANGUAGE plpgsql IMMUTABLE AS $f$
DECLARE
  rest text;
  m text[];
  result text[] := '{}';
BEGIN
  IF p IS NULL THEN RETURN NULL; END IF;
  rest := btrim(p);
  IF left(rest, 1) = '$' THEN rest := substr(rest, 2); END IF;
  FOR m IN SELECT regexp_matches(rest, '\\.("([^"]*)"|[^.\\[]+)|\\[([0-9]+|#)\\]', 'g') LOOP
    IF m[3] IS NOT NULL THEN
      result := result || m[3];
    ELSIF m[2] IS NOT NULL THEN
      result := result || m[2];
    ELSE
      result := result || m[1];
    END IF;
  END LOOP;
  RETURN result;
END
$f$;

CREATE OR REPLACE FUNCTION omniroute_jsonb_to_sqlite(v jsonb) RETURNS text LANGUAGE sql IMMUTABLE AS $f$
  SELECT CASE
    WHEN v IS NULL THEN NULL
    WHEN jsonb_typeof(v) = 'null' THEN NULL
    WHEN jsonb_typeof(v) = 'string' THEN v #>> '{}'
    WHEN jsonb_typeof(v) = 'boolean' THEN CASE WHEN v::boolean THEN '1' ELSE '0' END
    ELSE v::text
  END
$f$;

CREATE OR REPLACE FUNCTION omniroute_json_extract(j text, p text) RETURNS text LANGUAGE sql IMMUTABLE AS $f$
  SELECT omniroute_jsonb_to_sqlite(omniroute_try_jsonb(j) #> omniroute_json_path(p))
$f$;
CREATE OR REPLACE FUNCTION omniroute_json_extract(j text) RETURNS text LANGUAGE sql IMMUTABLE AS $f$
  SELECT omniroute_jsonb_to_sqlite(omniroute_try_jsonb(j))
$f$;

CREATE OR REPLACE FUNCTION omniroute_json_valid(j text) RETURNS boolean LANGUAGE sql IMMUTABLE AS $f$
  SELECT CASE WHEN j IS NULL THEN NULL ELSE omniroute_try_jsonb(j) IS NOT NULL END
$f$;

CREATE OR REPLACE FUNCTION omniroute_json_type_of(v jsonb) RETURNS text LANGUAGE sql IMMUTABLE AS $f$
  SELECT CASE
    WHEN v IS NULL THEN NULL
    WHEN jsonb_typeof(v) = 'string' THEN 'text'
    WHEN jsonb_typeof(v) = 'number' THEN CASE WHEN v::text ~ '^-?[0-9]+$' THEN 'integer' ELSE 'real' END
    WHEN jsonb_typeof(v) = 'boolean' THEN CASE WHEN v::boolean THEN 'true' ELSE 'false' END
    ELSE jsonb_typeof(v)
  END
$f$;
CREATE OR REPLACE FUNCTION omniroute_json_type(j text) RETURNS text LANGUAGE sql IMMUTABLE AS $f$
  SELECT omniroute_json_type_of(omniroute_try_jsonb(j))
$f$;
CREATE OR REPLACE FUNCTION omniroute_json_type(j text, p text) RETURNS text LANGUAGE sql IMMUTABLE AS $f$
  SELECT omniroute_json_type_of(omniroute_try_jsonb(j) #> omniroute_json_path(p))
$f$;

CREATE OR REPLACE FUNCTION omniroute_json(j text) RETURNS text LANGUAGE sql IMMUTABLE AS $f$
  SELECT omniroute_try_jsonb(j)::text
$f$;

CREATE OR REPLACE FUNCTION omniroute_json_array_length(j text) RETURNS bigint LANGUAGE sql IMMUTABLE AS $f$
  SELECT CASE WHEN jsonb_typeof(omniroute_try_jsonb(j)) = 'array' THEN jsonb_array_length(omniroute_try_jsonb(j)) ELSE 0 END
$f$;
CREATE OR REPLACE FUNCTION omniroute_json_array_length(j text, p text) RETURNS bigint LANGUAGE sql IMMUTABLE AS $f$
  SELECT CASE WHEN jsonb_typeof(omniroute_try_jsonb(j) #> omniroute_json_path(p)) = 'array' THEN jsonb_array_length(omniroute_try_jsonb(j) #> omniroute_json_path(p)) ELSE 0 END
$f$;

CREATE OR REPLACE FUNCTION omniroute_json_value(v text) RETURNS jsonb LANGUAGE sql IMMUTABLE AS $f$ SELECT to_jsonb(v) $f$;
CREATE OR REPLACE FUNCTION omniroute_json_value(v bigint) RETURNS jsonb LANGUAGE sql IMMUTABLE AS $f$ SELECT to_jsonb(v) $f$;
CREATE OR REPLACE FUNCTION omniroute_json_value(v double precision) RETURNS jsonb LANGUAGE sql IMMUTABLE AS $f$ SELECT to_jsonb(v) $f$;
CREATE OR REPLACE FUNCTION omniroute_json_value(v boolean) RETURNS jsonb LANGUAGE sql IMMUTABLE AS $f$ SELECT to_jsonb(v) $f$;

CREATE OR REPLACE FUNCTION omniroute_json_set_impl(j text, p text, v jsonb, create_missing boolean, replace_existing boolean) RETURNS text LANGUAGE plpgsql IMMUTABLE AS $f$
DECLARE
  doc jsonb := omniroute_try_jsonb(j);
  path text[] := omniroute_json_path(p);
  existing jsonb;
BEGIN
  IF doc IS NULL THEN RETURN NULL; END IF;
  IF array_length(path, 1) IS NULL THEN RETURN v::text; END IF;
  IF path[array_length(path, 1)] = '#' THEN
    IF NOT create_missing THEN RETURN doc::text; END IF;
    path := path[1:array_length(path, 1) - 1];
    IF array_length(path, 1) IS NULL THEN
      IF jsonb_typeof(doc) = 'array' THEN RETURN (doc || jsonb_build_array(v))::text; END IF;
      RETURN doc::text;
    END IF;
    existing := doc #> path;
    IF jsonb_typeof(existing) = 'array' THEN RETURN jsonb_set(doc, path, existing || jsonb_build_array(v), false)::text; END IF;
    RETURN doc::text;
  END IF;
  existing := doc #> path;
  IF existing IS NULL THEN
    IF NOT create_missing THEN RETURN doc::text; END IF;
    RETURN jsonb_set(doc, path, v, true)::text;
  END IF;
  IF NOT replace_existing THEN RETURN doc::text; END IF;
  RETURN jsonb_set(doc, path, v, false)::text;
END
$f$;

CREATE OR REPLACE FUNCTION omniroute_json_set(j text, p text, v text) RETURNS text LANGUAGE sql IMMUTABLE AS $f$ SELECT omniroute_json_set_impl(j, p, omniroute_json_value(v), true, true) $f$;
CREATE OR REPLACE FUNCTION omniroute_json_set(j text, p text, v bigint) RETURNS text LANGUAGE sql IMMUTABLE AS $f$ SELECT omniroute_json_set_impl(j, p, omniroute_json_value(v), true, true) $f$;
CREATE OR REPLACE FUNCTION omniroute_json_set(j text, p text, v double precision) RETURNS text LANGUAGE sql IMMUTABLE AS $f$ SELECT omniroute_json_set_impl(j, p, omniroute_json_value(v), true, true) $f$;
CREATE OR REPLACE FUNCTION omniroute_json_insert(j text, p text, v text) RETURNS text LANGUAGE sql IMMUTABLE AS $f$ SELECT omniroute_json_set_impl(j, p, omniroute_json_value(v), true, false) $f$;
CREATE OR REPLACE FUNCTION omniroute_json_insert(j text, p text, v bigint) RETURNS text LANGUAGE sql IMMUTABLE AS $f$ SELECT omniroute_json_set_impl(j, p, omniroute_json_value(v), true, false) $f$;
CREATE OR REPLACE FUNCTION omniroute_json_replace(j text, p text, v text) RETURNS text LANGUAGE sql IMMUTABLE AS $f$ SELECT omniroute_json_set_impl(j, p, omniroute_json_value(v), false, true) $f$;
CREATE OR REPLACE FUNCTION omniroute_json_replace(j text, p text, v bigint) RETURNS text LANGUAGE sql IMMUTABLE AS $f$ SELECT omniroute_json_set_impl(j, p, omniroute_json_value(v), false, true) $f$;

CREATE OR REPLACE FUNCTION omniroute_json_remove(j text, VARIADIC paths text[]) RETURNS text LANGUAGE plpgsql IMMUTABLE AS $f$
DECLARE
  doc jsonb := omniroute_try_jsonb(j);
  p text;
BEGIN
  IF doc IS NULL THEN RETURN NULL; END IF;
  FOREACH p IN ARRAY paths LOOP
    doc := doc #- omniroute_json_path(p);
  END LOOP;
  RETURN doc::text;
END
$f$;

CREATE OR REPLACE FUNCTION omniroute_json_each(j text) RETURNS TABLE(key text, value text, type text) LANGUAGE plpgsql IMMUTABLE AS $f$
DECLARE
  doc jsonb := omniroute_try_jsonb(j);
BEGIN
  IF doc IS NULL THEN RETURN; END IF;
  IF jsonb_typeof(doc) = 'array' THEN
    RETURN QUERY SELECT (e.ordinality - 1)::text, omniroute_jsonb_to_sqlite(e.value), omniroute_json_type_of(e.value)
      FROM jsonb_array_elements(doc) WITH ORDINALITY AS e(value, ordinality);
  ELSIF jsonb_typeof(doc) = 'object' THEN
    RETURN QUERY SELECT e.key, omniroute_jsonb_to_sqlite(e.value), omniroute_json_type_of(e.value) FROM jsonb_each(doc) AS e(key, value);
  END IF;
END
$f$;
`;
}

function jsonEachOverloads(): string {
  return `
DROP FUNCTION IF EXISTS omniroute_json_each(text, text);
DROP FUNCTION IF EXISTS omniroute_json_tree(text);
CREATE OR REPLACE FUNCTION omniroute_json_each(j text, p text) RETURNS TABLE(key text, value text, type text) LANGUAGE sql IMMUTABLE AS $f$
  SELECT * FROM omniroute_json_each((omniroute_try_jsonb(j) #> omniroute_json_path(p))::text)
$f$;
CREATE OR REPLACE FUNCTION omniroute_json_tree(j text) RETURNS TABLE(key text, value text, type text) LANGUAGE sql IMMUTABLE AS $f$
  SELECT * FROM omniroute_json_each(j)
$f$;
`;
}

function scalarFunctions(): string {
  return `
CREATE OR REPLACE FUNCTION omniroute_typeof(v text) RETURNS text LANGUAGE sql IMMUTABLE AS $f$ SELECT CASE WHEN v IS NULL THEN 'null' ELSE 'text' END $f$;
CREATE OR REPLACE FUNCTION omniroute_typeof(v bigint) RETURNS text LANGUAGE sql IMMUTABLE AS $f$ SELECT CASE WHEN v IS NULL THEN 'null' ELSE 'integer' END $f$;
CREATE OR REPLACE FUNCTION omniroute_typeof(v double precision) RETURNS text LANGUAGE sql IMMUTABLE AS $f$ SELECT CASE WHEN v IS NULL THEN 'null' ELSE 'real' END $f$;
CREATE OR REPLACE FUNCTION omniroute_typeof(v numeric) RETURNS text LANGUAGE sql IMMUTABLE AS $f$ SELECT CASE WHEN v IS NULL THEN 'null' ELSE 'real' END $f$;
CREATE OR REPLACE FUNCTION omniroute_typeof(v bytea) RETURNS text LANGUAGE sql IMMUTABLE AS $f$ SELECT CASE WHEN v IS NULL THEN 'null' ELSE 'blob' END $f$;
CREATE OR REPLACE FUNCTION omniroute_typeof(v boolean) RETURNS text LANGUAGE sql IMMUTABLE AS $f$ SELECT CASE WHEN v IS NULL THEN 'null' ELSE 'integer' END $f$;

CREATE OR REPLACE FUNCTION omniroute_to_integer(v text) RETURNS bigint LANGUAGE plpgsql IMMUTABLE AS $f$
DECLARE m text;
BEGIN
  IF v IS NULL THEN RETURN NULL; END IF;
  m := (regexp_match(btrim(v), '^[+-]?[0-9]+'))[1];
  IF m IS NOT NULL THEN RETURN m::bigint; END IF;
  m := (regexp_match(btrim(v), '^[+-]?[0-9]*\\.[0-9]+'))[1];
  IF m IS NOT NULL THEN RETURN trunc(m::numeric)::bigint; END IF;
  RETURN 0;
EXCEPTION WHEN OTHERS THEN
  RETURN 0;
END
$f$;
CREATE OR REPLACE FUNCTION omniroute_to_integer(v bigint) RETURNS bigint LANGUAGE sql IMMUTABLE AS $f$ SELECT v $f$;
CREATE OR REPLACE FUNCTION omniroute_to_integer(v double precision) RETURNS bigint LANGUAGE sql IMMUTABLE AS $f$ SELECT trunc(v)::bigint $f$;
CREATE OR REPLACE FUNCTION omniroute_to_integer(v numeric) RETURNS bigint LANGUAGE sql IMMUTABLE AS $f$ SELECT trunc(v)::bigint $f$;
CREATE OR REPLACE FUNCTION omniroute_to_integer(v boolean) RETURNS bigint LANGUAGE sql IMMUTABLE AS $f$ SELECT CASE WHEN v THEN 1 ELSE 0 END $f$;
CREATE OR REPLACE FUNCTION omniroute_to_integer(v bytea) RETURNS bigint LANGUAGE sql IMMUTABLE AS $f$ SELECT 0::bigint $f$;

CREATE OR REPLACE FUNCTION omniroute_to_real(v text) RETURNS double precision LANGUAGE plpgsql IMMUTABLE AS $f$
DECLARE m text;
BEGIN
  IF v IS NULL THEN RETURN NULL; END IF;
  m := (regexp_match(btrim(v), '^([+-]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?)'))[1];
  IF m IS NULL THEN RETURN 0; END IF;
  RETURN m::double precision;
EXCEPTION WHEN OTHERS THEN
  RETURN 0;
END
$f$;
CREATE OR REPLACE FUNCTION omniroute_to_real(v bigint) RETURNS double precision LANGUAGE sql IMMUTABLE AS $f$ SELECT v::double precision $f$;
CREATE OR REPLACE FUNCTION omniroute_to_real(v double precision) RETURNS double precision LANGUAGE sql IMMUTABLE AS $f$ SELECT v $f$;
CREATE OR REPLACE FUNCTION omniroute_to_real(v numeric) RETURNS double precision LANGUAGE sql IMMUTABLE AS $f$ SELECT v::double precision $f$;
CREATE OR REPLACE FUNCTION omniroute_to_real(v boolean) RETURNS double precision LANGUAGE sql IMMUTABLE AS $f$ SELECT CASE WHEN v THEN 1.0 ELSE 0.0 END $f$;

CREATE OR REPLACE FUNCTION omniroute_hex(v text) RETURNS text LANGUAGE sql IMMUTABLE AS $f$ SELECT upper(encode(convert_to(v, 'UTF8'), 'hex')) $f$;
CREATE OR REPLACE FUNCTION omniroute_hex(v bytea) RETURNS text LANGUAGE sql IMMUTABLE AS $f$ SELECT upper(encode(v, 'hex')) $f$;
CREATE OR REPLACE FUNCTION omniroute_hex(v bigint) RETURNS text LANGUAGE sql IMMUTABLE AS $f$ SELECT upper(encode(convert_to(v::text, 'UTF8'), 'hex')) $f$;

CREATE OR REPLACE FUNCTION omniroute_randomblob(n bigint) RETURNS bytea LANGUAGE sql VOLATILE AS $f$
  SELECT decode(string_agg(lpad(to_hex(floor(random() * 256)::int), 2, '0'), ''), 'hex') FROM generate_series(1, GREATEST(n, 1))
$f$;

CREATE OR REPLACE FUNCTION omniroute_random() RETURNS bigint LANGUAGE sql VOLATILE AS $f$
  SELECT (floor(random() * 4294967296)::bigint * 4294967296 + floor(random() * 4294967296)::bigint) - 9223372036854775807 - 1
$f$;

CREATE OR REPLACE FUNCTION omniroute_substr(v text, start bigint) RETURNS text LANGUAGE sql IMMUTABLE AS $f$
  SELECT CASE
    WHEN v IS NULL OR start IS NULL THEN NULL
    WHEN start < 0 THEN substr(v, GREATEST(length(v) + start::int + 1, 1))
    WHEN start = 0 THEN v
    ELSE substr(v, start::int)
  END
$f$;
CREATE OR REPLACE FUNCTION omniroute_substr(v text, start bigint, len bigint) RETURNS text LANGUAGE sql IMMUTABLE AS $f$
  SELECT CASE
    WHEN v IS NULL OR start IS NULL OR len IS NULL THEN NULL
    WHEN len < 0 THEN omniroute_substr(v, start + len, -len)
    WHEN start < 0 THEN substr(v, GREATEST(length(v) + start::int + 1, 1), LEAST(len, length(v) + start + 1)::int)
    WHEN start = 0 THEN substr(v, 1, GREATEST(len::int - 1, 0))
    ELSE substr(v, start::int, len::int)
  END
$f$;
CREATE OR REPLACE FUNCTION omniroute_substr(v bigint, start bigint) RETURNS text LANGUAGE sql IMMUTABLE AS $f$ SELECT omniroute_substr(v::text, start) $f$;
CREATE OR REPLACE FUNCTION omniroute_substr(v bigint, start bigint, len bigint) RETURNS text LANGUAGE sql IMMUTABLE AS $f$ SELECT omniroute_substr(v::text, start, len) $f$;
CREATE OR REPLACE FUNCTION omniroute_substr(v double precision, start bigint) RETURNS text LANGUAGE sql IMMUTABLE AS $f$ SELECT omniroute_substr(v::text, start) $f$;
CREATE OR REPLACE FUNCTION omniroute_substr(v double precision, start bigint, len bigint) RETURNS text LANGUAGE sql IMMUTABLE AS $f$ SELECT omniroute_substr(v::text, start, len) $f$;
`;
}

function catalogObjects(): string {
  return `
DROP FUNCTION IF EXISTS omniroute_table_info(text);
DROP FUNCTION IF EXISTS omniroute_index_list(text);
DROP FUNCTION IF EXISTS omniroute_table_schema(text);
CREATE OR REPLACE VIEW sqlite_master AS
  SELECT 'table'::text AS type, c.relname::text AS name, c.relname::text AS tbl_name, 0::bigint AS rootpage, NULL::text AS sql
    FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
   WHERE n.nspname = current_schema() AND c.relkind IN ('r', 'p')
  UNION ALL
  SELECT 'view'::text, c.relname::text, c.relname::text, 0::bigint, pg_get_viewdef(c.oid)
    FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
   WHERE n.nspname = current_schema() AND c.relkind = 'v' AND c.relname <> 'sqlite_master'
  UNION ALL
  SELECT 'index'::text, ic.relname::text, tc.relname::text, 0::bigint, pg_get_indexdef(i.indexrelid)
    FROM pg_index i JOIN pg_class ic ON ic.oid = i.indexrelid JOIN pg_class tc ON tc.oid = i.indrelid JOIN pg_namespace n ON n.oid = tc.relnamespace
   WHERE n.nspname = current_schema()
  UNION ALL
  SELECT 'trigger'::text, tg.tgname::text, tc.relname::text, 0::bigint, pg_get_triggerdef(tg.oid)
    FROM pg_trigger tg JOIN pg_class tc ON tc.oid = tg.tgrelid JOIN pg_namespace n ON n.oid = tc.relnamespace
   WHERE n.nspname = current_schema() AND NOT tg.tgisinternal;

CREATE OR REPLACE FUNCTION omniroute_table_info(tbl text) RETURNS TABLE(cid bigint, name text, type text, "notnull" bigint, dflt_value text, pk bigint) LANGUAGE sql STABLE AS $f$
  SELECT (row_number() OVER (ORDER BY a.attnum) - 1)::bigint,
         a.attname::text,
         CASE
           WHEN t.typname IN ('int8', 'int4', 'int2', 'bool') THEN 'INTEGER'
           WHEN t.typname IN ('float8', 'float4', 'numeric') THEN 'REAL'
           WHEN t.typname = 'bytea' THEN 'BLOB'
           ELSE 'TEXT'
         END,
         CASE WHEN a.attnotnull THEN 1 ELSE 0 END::bigint,
         pg_get_expr(d.adbin, d.adrelid),
         COALESCE((SELECT array_position(string_to_array(i.indkey::text, ' ')::int2[], a.attnum) FROM pg_index i WHERE i.indrelid = c.oid AND i.indisprimary), 0)::bigint
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    JOIN pg_attribute a ON a.attrelid = c.oid
    JOIN pg_type t ON t.oid = a.atttypid
    LEFT JOIN pg_attrdef d ON d.adrelid = c.oid AND d.adnum = a.attnum
   WHERE n.nspname = current_schema() AND c.relname = tbl AND a.attnum > 0 AND NOT a.attisdropped AND a.attname <> 'rowid'
   ORDER BY a.attnum
$f$;

CREATE OR REPLACE FUNCTION omniroute_index_list(tbl text) RETURNS TABLE(seq bigint, name text, "unique" bigint, origin text, partial bigint) LANGUAGE sql STABLE AS $f$
  SELECT (row_number() OVER (ORDER BY ic.relname) - 1)::bigint,
         ic.relname::text,
         CASE WHEN i.indisunique THEN 1 ELSE 0 END::bigint,
         CASE WHEN i.indisprimary THEN 'pk' WHEN i.indisunique THEN 'u' ELSE 'c' END,
         CASE WHEN i.indpred IS NOT NULL THEN 1 ELSE 0 END::bigint
    FROM pg_index i
    JOIN pg_class ic ON ic.oid = i.indexrelid
    JOIN pg_class tc ON tc.oid = i.indrelid
    JOIN pg_namespace n ON n.oid = tc.relnamespace
   WHERE n.nspname = current_schema() AND tc.relname = tbl
$f$;

CREATE OR REPLACE FUNCTION omniroute_table_schema(tbl text) RETURNS TABLE(column_name text, data_type text, is_identity boolean, pk_position bigint, unique_groups text) LANGUAGE sql STABLE AS $f$
  SELECT a.attname::text,
         CASE
           WHEN t.typname IN ('int8', 'int4', 'int2', 'bool') THEN 'BIGINT'
           WHEN t.typname IN ('float8', 'float4', 'numeric') THEN 'DOUBLE PRECISION'
           WHEN t.typname = 'bytea' THEN 'BYTEA'
           ELSE 'TEXT'
         END,
         a.attidentity <> '',
         COALESCE((SELECT array_position(string_to_array(i.indkey::text, ' ')::int2[], a.attnum) FROM pg_index i WHERE i.indrelid = c.oid AND i.indisprimary), 0)::bigint,
         (SELECT string_agg(i.indexrelid::text, ',') FROM pg_index i WHERE i.indrelid = c.oid AND i.indisunique AND NOT i.indisprimary AND i.indpred IS NULL AND i.indexprs IS NULL AND a.attnum = ANY(i.indkey::int2[]))
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    JOIN pg_attribute a ON a.attrelid = c.oid
    JOIN pg_type t ON t.oid = a.atttypid
   WHERE n.nspname = current_schema() AND c.relname = tbl AND a.attnum > 0 AND NOT a.attisdropped
   ORDER BY a.attnum
$f$;

CREATE OR REPLACE FUNCTION omniroute_bootstrap_version() RETURNS integer LANGUAGE sql IMMUTABLE AS $f$ SELECT ${POSTGRES_BOOTSTRAP_VERSION} $f$;
`;
}

export function buildBootstrapSql(): string {
  return [
    "BEGIN",
    `SELECT pg_advisory_xact_lock(${POSTGRES_BOOTSTRAP_LOCK_KEY}, hashtext(current_schema()))`,
    baseTimestampFunctions(),
    timestampFunctions(),
    jsonFunctions(),
    jsonEachOverloads(),
    scalarFunctions(),
    catalogObjects(),
    "COMMIT",
  ].join(";\n");
}
