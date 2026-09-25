.pragma library

function resetMinutes(isoStr) {
    if (!isoStr) return null;
    try {
        var clean = isoStr.replace("Z", "+00:00");
        var target = new Date(clean).getTime();
        var now = Date.now();
        var diff = target - now;
        if (isNaN(target) || diff <= 0) return 0;
        return Math.floor(diff / 60000);
    } catch (e) {
        return null;
    }
}

function formatResetShort(isoStr) {
    var mins = resetMinutes(isoStr);
    if (mins === null) return "";
    if (mins <= 0) return "resets soon";
    var d = Math.floor(mins / 1440);
    var h = Math.floor((mins % 1440) / 60);
    var m = mins % 60;
    if (d > 0) return d + "d " + h + "h";
    if (h > 0) return h + "h " + m + "m";
    return m + "m";
}

function deriveShortTag(key, resetAt) {
    var k = (key || "").toLowerCase();
    if (k.indexOf("(") !== -1 && k.indexOf(")") !== -1) {
        var inner = k.split("(")[1].split(")")[0].trim();
        if (inner.length > 0) return inner;
    }
    if (k.indexOf("monthly") !== -1 || k.indexOf("month") !== -1) return "mo";
    if (k.indexOf("weekly") !== -1 || k.indexOf("week") !== -1) return "wk";
    if (k.indexOf("session") !== -1 || k.indexOf("sess") !== -1) return "sess";
    if (k.indexOf("5h") !== -1) return "5h";
    if (k.indexOf("credit") !== -1) return "cred";
    
    // Fallback using reset minutes if available
    var mins = resetMinutes(resetAt);
    if (mins !== null && mins > 0) {
        if (mins >= 20 * 1440) return "mo";
        if (mins >= 4 * 1440) return "wk";
        if (mins >= 20 * 60) return "1d";
        if (mins >= 3 * 60) return "5h";
        return "1h";
    }
    return k.substring(0, 4);
}

function formatTokens(n) {
    var num = Number(n) || 0;
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M tokens";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K tokens";
    return num + " tokens";
}

function compactTokens(n) {
    var num = Number(n) || 0;
    if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
    if (num >= 1000) return (num / 1000).toFixed(1) + "K";
    return String(num);
}

function formatCost(usd) {
    var num = Number(usd) || 0;
    return "$" + num.toFixed(2);
}

function statusColor(leftPct) {
    if (leftPct > 40) return "#22c55e"; // green
    if (leftPct > 15) return "#f59e0b"; // amber
    return "#ff2b4d"; // red
}

function prettifyModel(key) {
    if (!key) return "";
    var k = String(key).toLowerCase();
    
    // Claude
    if (k.indexOf("claude") !== -1) {
        var thinking = (k.indexOf("thinking") !== -1) ? " (Thinking)" : "";
        var versions = ["4.8", "4-8", "4.7", "4-7", "4.6", "4-6", "4.5", "4-5", "4.1", "4-1", "3.7", "3-7", "3.5", "3-5", "3"];
        var ver = "";
        for (var i = 0; i < versions.length; i++) {
            if (k.indexOf(versions[i]) !== -1) {
                ver = " " + versions[i].replace("-", ".");
                break;
            }
        }
        if (k.indexOf("sonnet") !== -1) return "Claude" + ver + " Sonnet" + thinking;
        if (k.indexOf("haiku") !== -1) return "Claude" + ver + " Haiku" + thinking;
        if (k.indexOf("opus") !== -1) return "Claude" + ver + " Opus" + thinking;
        return "Claude" + ver + thinking;
    }
    
    // OpenAI
    if (k.indexOf("gpt-4o-mini") !== -1) return "GPT-4o mini";
    if (k.indexOf("gpt-4o") !== -1) return "GPT-4o";
    if (k.indexOf("o1-mini") !== -1) return "o1-mini";
    if (k.indexOf("o1-preview") !== -1) return "o1-preview";
    if (k === "o1" || k.indexOf("o1-") !== -1) return "o1";
    if (k.indexOf("o3-mini") !== -1) return "o3-mini";
    if (k === "o3" || k.indexOf("o3-") !== -1) return "o3";
    if (k.indexOf("120b") !== -1) return "GPT-OSS 120B";
    if (k.indexOf("4-turbo") !== -1) return "GPT-4 Turbo";
    
    // Gemini
    if (k.indexOf("gemini") !== -1) {
        if (k.indexOf("pro-agent") !== -1) return "Gemini Pro Agent";
        if (k.indexOf("3.7-flash") !== -1 || k.indexOf("3-7-flash") !== -1) return "Gemini 3.7 Flash";
        if (k.indexOf("3.1-flash") !== -1 || k.indexOf("3-1-flash") !== -1) {
            return (k.indexOf("lite") !== -1) ? "Gemini 3.1 Flash Lite" : "Gemini 3.1 Flash";
        }
        if (k.indexOf("3.1-pro") !== -1 || k.indexOf("3-1-pro") !== -1) return "Gemini 3.1 Pro";
        if (k.indexOf("2.0-flash") !== -1 || k.indexOf("2-0-flash") !== -1) return "Gemini 2.0 Flash";
        if (k.indexOf("flash-lite") !== -1 || k.indexOf("flash_lite") !== -1) return "Gemini Flash Lite";
        if (k.indexOf("flash") !== -1) return "Gemini Flash";
        if (k.indexOf("pro") !== -1) return "Gemini Pro";
    }
    
    // DeepSeek
    if (k.indexOf("deepseek") !== -1) {
        if (k.indexOf("r1") !== -1 || k.indexOf("reasoner") !== -1) return "DeepSeek R1";
        if (k.indexOf("v4") !== -1 || k.indexOf("v-4") !== -1) return (k.indexOf("flash") !== -1) ? "DeepSeek V4 Flash" : "DeepSeek V4";
        if (k.indexOf("v3") !== -1 || k.indexOf("v-3") !== -1) return "DeepSeek V3";
        return "DeepSeek";
    }
    
    // GLM
    if (k.indexOf("glm") !== -1) {
        if (k.indexOf("5.3") !== -1 || k.indexOf("5-3") !== -1) return "GLM 5.3";
        if (k.indexOf("5") !== -1) return "GLM 5";
        return "GLM";
    }
    
    // Kimi
    if (k.indexOf("kimi") !== -1) {
        if (k.indexOf("k3") !== -1) return "Kimi K3";
        if (k.indexOf("k2") !== -1) return "Kimi K2";
        return "Kimi";
    }

    if (k.indexOf("credit") !== -1) return "Credits";
    
    return key.replace(/[-_]/g, " ").replace(/\b\w/g, function(l) { return l.toUpperCase(); });
}
