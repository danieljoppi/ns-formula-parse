// Originally generated from...
//   1) sql-bubble.txt (from sqlite.org)
//   2) ./sql-bubble.rb sql-bubble.txt > tmp/rules.rb
//   3) ./bubble-to-pegjs.rb tmp/rules.rb bubble-to-pegjs_ex.rb > tmp/sql.pegjs
//
// Then, manually edited for pegjs suitability.
//
// Rules with indentation or with comments have manual edits.
//
start = value

whitespace = [ \t\n\r]*
whitespace1 = [ \t\n\r]+

value =
  v: ( CASE(expr) ? (WHEN expr THEN expr)+ (ELSE expr)? END)
  {
  	var test = v[1],
      block1 = v[2],
      block2 = v[3];

    if (Array.isArray(block1[0]))
      block1 = block1[0];

    var when = block1[1];
    if (test == when )
      return block1[3];
    else
      return block2[1];
  }

string =
  s:('\'' (whitespace1 / name) '\'')
 { return s[1]+''; }

expr =
  e: ( whitespace
       ( select
       / ( ( ISNULL / NOTNULL / ( NOT NULL ) ) )
       / ( IS NOT ? expr )
       / ( NOT ? BETWEEN expr AND expr )
       / value
       / string
       / block_select
     ) )
  { return e[1]; }

binary_operator =
  x: ( whitespace ('||') whitespace (select / string ))
  { return x[3] }

name =
  str:[A-Za-z0-9_\-]+
  { return str.join(''); }

block_select =
	bs : ('(' select (binary_operator)* ')' )
    {
      bs.pop();
      bs = bs.splice(1);
      return bs.map(function(w) {
      	if (Array.isArray(w)) return w.join('')
        else return w;
      }).join('');
    }

select =
	s: ('{'(name)'}')
    { return s[1]; }

AND = w: (whitespace1 ("AND" / "and")) {return w[1];}
BETWEEN = w: (whitespace1 "BETWEEN") {return w[1];}
CASE = w: (whitespace ("CASE" / "case")) {return w[1];}
ELSE = w: (whitespace ("ELSE" / "else")) {return w[1];}
END = w: (whitespace ("END" / "end")) {return w[1];}
IS = w: (whitespace1 ("IS" / "is")) {return w[1];}
ISNULL = w: (whitespace1 "ISNULL") {return w[1];}
NOT = w: (whitespace1 "NOT") {return w[1];}
NULL = w: (whitespace1 "NULL") {return w[1];}
NOTNULL = w: (whitespace1 "NOTNULL") {return w[1];}
THEN = w: (whitespace1 ("THEN" / "then")) {return w[1];}
WHEN = w: (whitespace1 ("WHEN" / "when")) {return w[1];}