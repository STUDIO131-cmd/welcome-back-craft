import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

interface ContactPayload {
  firstName?: string;
  lastName?: string;
  company?: string;
  whatsapp?: string;
  instagram?: string;
  revenue?: string;
  timing?: string;
  campaignDate?: string;
  hasPlan?: string;
  planDescription?: string;
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const row = (label: string, value?: string) => {
  const v = (value ?? "").trim();
  if (!v) return "";
  return `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;font-size:13px;width:200px;vertical-align:top;">${escapeHtml(
    label,
  )}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#111;font-size:14px;">${escapeHtml(
    v,
  )}</td></tr>`;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const SMTP_USER = Deno.env.get("HOSTINGER_SMTP_USER");
    const SMTP_PASSWORD = Deno.env.get("HOSTINGER_SMTP_PASSWORD");
    if (!SMTP_USER || !SMTP_PASSWORD) {
      console.error("[send-contact-email] Missing SMTP env vars");
      return new Response(
        JSON.stringify({ error: "SMTP not configured" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const data = (await req.json()) as ContactPayload;

    // Minimal validation: required fields from the form
    if (!data.firstName || !data.lastName || !data.whatsapp || !data.instagram) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const fullName = `${data.firstName} ${data.lastName}`.trim();
    const subject = `Novo lead — ${fullName}${data.company ? ` (${data.company})` : ""}`;

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#fafafa;">
        <h2 style="color:#2B2B2B;font-size:20px;margin:0 0 16px;">Novo lead — Studio 131</h2>
        <p style="color:#666;font-size:13px;margin:0 0 20px;">Recebido via formulário do site</p>
        <table style="width:100%;border-collapse:collapse;background:#fff;border:1px solid #eee;border-radius:8px;overflow:hidden;">
          ${row("Nome", fullName)}
          ${row("Empresa", data.company)}
          ${row("WhatsApp", data.whatsapp)}
          ${row("Instagram", data.instagram)}
          ${row("Faturamento mensal", data.revenue)}
          ${row("Timing", data.timing)}
          ${row("Data da campanha", data.campaignDate)}
          ${row("Tem planejamento?", data.hasPlan)}
          ${row("Descrição do planejamento", data.planDescription)}
        </table>
      </div>
    `;

    const text = [
      `Novo lead — Studio 131`,
      ``,
      `Nome: ${fullName}`,
      data.company ? `Empresa: ${data.company}` : null,
      `WhatsApp: ${data.whatsapp}`,
      `Instagram: ${data.instagram}`,
      data.revenue ? `Faturamento: ${data.revenue}` : null,
      data.timing ? `Timing: ${data.timing}` : null,
      data.campaignDate ? `Data da campanha: ${data.campaignDate}` : null,
      data.hasPlan ? `Tem planejamento?: ${data.hasPlan}` : null,
      data.planDescription ? `Descrição: ${data.planDescription}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const client = new SMTPClient({
      connection: {
        hostname: "smtp.hostinger.com",
        port: 465,
        tls: true,
        auth: {
          username: SMTP_USER,
          password: SMTP_PASSWORD,
        },
      },
    });

    await client.send({
      from: `Studio 131 <${SMTP_USER}>`,
      to: "igorgagliardi@studio131.com.br",
      replyTo: SMTP_USER,
      subject,
      content: text,
      html,
    });

    await client.close();

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[send-contact-email] Failed:", message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});