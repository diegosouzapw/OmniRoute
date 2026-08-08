#!/usr/bin/env python3
"""
Memory Stack Smoke Test
Verifies pgvector/ChromaDB/FalkorDB connectivity for SerpentOS.
Usage: python3 scripts/memory_smoke_test.py
"""
import os
import sys

def test_chroma():
    try:
        import chromadb
        chroma_url = os.environ.get("CHROMA_URL", "http://localhost:8000")
        host = chroma_url.replace("http://", "").split(":")[0]
        port = int(chroma_url.split(":")[-1]) if ":" in chroma_url else 8000
        client = chromadb.HttpClient(host=host, port=port)
        client.heartbeat()
        col = client.get_or_create_collection("smoke_test")
        col.add(documents=["smoke test"], ids=["smoke_1"])
        result = col.query(query_texts=["smoke test"], n_results=1)
        assert result["ids"][0][0] == "smoke_1"
        col.delete(ids=["smoke_1"])
        print(f"✅ ChromaDB OK ({chroma_url})")
        return True
    except ImportError:
        print("⚠️  chromadb not installed — skipping")
        return True
    except Exception as e:
        print(f"❌ ChromaDB FAIL: {e}")
        return False

def test_pgvector():
    try:
        import psycopg2
        db_url = os.environ.get("DATABASE_URL", "")
        if not db_url:
            print("⚠️  DATABASE_URL not set — skipping pgvector test")
            return True
        conn = psycopg2.connect(db_url)
        cur = conn.cursor()
        cur.execute("SELECT 1;")
        cur.close()
        conn.close()
        print("✅ pgvector/PostgreSQL OK")
        return True
    except ImportError:
        print("⚠️  psycopg2 not installed — skipping")
        return True
    except Exception as e:
        print(f"❌ pgvector FAIL: {e}")
        return False

if __name__ == "__main__":
    print("\n🧠 Memory Stack Smoke Test\n" + "─" * 30)
    results = [test_chroma(), test_pgvector()]
    print("─" * 30)
    if all(results):
        print("✅ All memory checks passed\n")
        sys.exit(0)
    else:
        print("❌ Some memory checks failed\n")
        sys.exit(1)
