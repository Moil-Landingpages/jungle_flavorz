// Email template utilities.
// All templates are table-based with inline styles so they render across
// Gmail / Outlook / Apple Mail / mobile clients without quirks.

const BRAND = {
  gold: "#d4af37",
  caramel: "#a87434",
  brown: "#2b1b0f",
  cream: "#fffcf4",
  beige: "#f6ecd6",
  border: "#eadfc8",
  muted: "#7a5a3a",
  text: "#3a2a1a",
};

export function escapeHtml(s: string): string {
  return (s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function formatAmount(cents: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

/**
 * Shared shell: <html>, preheader, gold header bar, content card, footer.
 * `inner` is the content placed inside the white card.
 */
function shell(opts: {
  preheader: string;
  eyebrow: string;
  inner: string;
  footerNote?: string;
}): string {
  const { preheader, eyebrow, inner, footerNote } = opts;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<title>Jungle Flavorz</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.beige};font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:${BRAND.text};-webkit-font-smoothing:antialiased;">
  <!-- preheader -->
  <div style="display:none;font-size:1px;color:${BRAND.beige};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    ${escapeHtml(preheader)}
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BRAND.beige};padding:32px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:${BRAND.cream};border-radius:16px;overflow:hidden;box-shadow:0 6px 24px rgba(43,27,15,0.08);">

          <!-- header -->
          <tr>
            <td style="background:linear-gradient(135deg,${BRAND.gold} 0%,${BRAND.caramel} 100%);padding:28px 32px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <div style="font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:900;color:#ffffff;letter-spacing:-0.2px;line-height:1.1;">Jungle Flavorz</div>
                    <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.85);margin-top:6px;font-weight:600;">${escapeHtml(eyebrow)}</div>
                  </td>
                  <td align="right" style="vertical-align:middle;">
                    <div style="display:inline-block;width:48px;height:48px;line-height:48px;text-align:center;background:rgba(255,255,255,0.18);border:1px solid rgba(255,255,255,0.3);border-radius:50%;font-family:Georgia,serif;color:#ffffff;font-weight:900;font-size:18px;">JF</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- content -->
          <tr>
            <td style="padding:32px;">
              ${inner}
            </td>
          </tr>

          <!-- footer -->
          <tr>
            <td style="background:${BRAND.brown};padding:26px 32px;color:#e9d9be;font-size:13px;line-height:1.6;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <div style="font-family:Georgia,serif;color:${BRAND.gold};font-size:17px;font-weight:900;letter-spacing:-0.2px;">Linda Horukeye</div>
                    <div style="font-size:12px;opacity:0.8;margin-top:2px;letter-spacing:0.3px;">Founder &amp; CEO · Jungle Flavorz</div>

                    <div style="height:14px;line-height:14px;">&nbsp;</div>

                    <div style="opacity:0.95;">
                      <span style="display:inline-block;width:18px;">📞</span>
                      <a href="tel:+17373411905" style="color:${BRAND.gold};text-decoration:none;">737-341-1905</a>
                    </div>
                    <div style="opacity:0.95;margin-top:4px;">
                      <span style="display:inline-block;width:18px;">✉️</span>
                      <a href="mailto:linda@jungleflavorz.com" style="color:${BRAND.gold};text-decoration:none;">linda@jungleflavorz.com</a>
                    </div>
                    <div style="opacity:0.95;margin-top:4px;">
                      <span style="display:inline-block;width:18px;">🌐</span>
                      <a href="https://jungleflavorz.com" style="color:${BRAND.gold};text-decoration:none;">jungleflavorz.com</a>
                    </div>
                    <div style="opacity:0.95;margin-top:4px;">
                      <span style="display:inline-block;width:18px;">📍</span>
                      <span style="color:#e9d9be;">Austin, TX</span>
                    </div>
                    <div style="opacity:0.95;margin-top:4px;">
                      <span style="display:inline-block;width:18px;">📷</span>
                      <a href="https://instagram.com/jungleflavorz" style="color:${BRAND.gold};text-decoration:none;">@jungleflavorz</a>
                    </div>

                    ${
                      footerNote
                        ? `<div style="opacity:0.55;margin-top:18px;font-size:11px;border-top:1px solid rgba(233,217,190,0.15);padding-top:12px;">${escapeHtml(footerNote)}</div>`
                        : ""
                    }
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

        <div style="color:${BRAND.muted};font-size:11px;margin-top:14px;opacity:0.7;">
          © ${new Date().getFullYear()} Jungle Flavorz. All rights reserved.
        </div>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function button(href: string, label: string): string {
  return `
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:8px auto;">
    <tr>
      <td align="center" style="background:linear-gradient(135deg,${BRAND.gold},${BRAND.caramel});border-radius:999px;">
        <a href="${href}" style="display:inline-block;padding:14px 32px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;letter-spacing:0.3px;">
          ${escapeHtml(label)}
        </a>
      </td>
    </tr>
  </table>`;
}

// -------------------------------------------------------------------------
// 1. Quote confirmation — sent to the requesting client
// -------------------------------------------------------------------------
export function quoteClientEmail(args: {
  name: string;
  eventType: string;
  guestCount: string;
  date?: string;
}): { subject: string; html: string } {
  const firstName = args.name.split(" ")[0] || args.name;
  const inner = `
    <h1 style="font-family:Georgia,serif;color:${BRAND.brown};font-size:26px;font-weight:900;margin:0 0 12px;line-height:1.25;">
      Thank you, ${escapeHtml(firstName)} — we've got it.
    </h1>
    <p style="margin:0 0 16px;font-size:15px;line-height:1.65;color:${BRAND.text};">
      Your request landed safely in Chef Linda's inbox. She personally reviews every quote and will reach out within
      <strong>2 business hours</strong> with a tailored proposal.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.beige};border:1px solid ${BRAND.border};border-radius:12px;margin:20px 0;">
      <tr>
        <td style="padding:18px 20px;">
          <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.muted};font-weight:700;margin-bottom:8px;">Your request</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:14px;color:${BRAND.text};">
            <tr><td style="padding:4px 0;width:110px;color:${BRAND.muted};">Event</td><td style="padding:4px 0;"><strong>${escapeHtml(args.eventType)}</strong></td></tr>
            <tr><td style="padding:4px 0;color:${BRAND.muted};">Guests</td><td style="padding:4px 0;"><strong>${escapeHtml(args.guestCount)}</strong></td></tr>
            ${
              args.date
                ? `<tr><td style="padding:4px 0;color:${BRAND.muted};">Date</td><td style="padding:4px 0;"><strong>${escapeHtml(args.date)}</strong></td></tr>`
                : ""
            }
          </table>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 8px;font-size:15px;line-height:1.65;color:${BRAND.text};">
      Need to chat sooner? Call us anytime at
      <a href="tel:+17373411905" style="color:${BRAND.caramel};text-decoration:none;font-weight:700;">737-341-1905</a>.
    </p>

    <p style="margin:28px 0 0;font-size:15px;color:${BRAND.text};">
      Warmly,<br/>
      <strong style="font-family:Georgia,serif;color:${BRAND.brown};">Chef Linda &amp; the Jungle Flavorz team</strong>
    </p>
  `;
  return {
    subject: "We received your quote request — Jungle Flavorz",
    html: shell({
      preheader: `Thanks ${firstName} — Chef Linda will reply within 2 business hours.`,
      eyebrow: "Quote Confirmation",
      inner,
      footerNote:
        "You're receiving this because you requested a quote at jungleflavorz.com.",
    }),
  };
}

// -------------------------------------------------------------------------
// 2. Quote notification — sent to admin (Linda)
// -------------------------------------------------------------------------
export function quoteAdminEmail(args: {
  name: string;
  email: string;
  phone?: string;
  eventType: string;
  guestCount: string;
  date?: string;
  message?: string;
}): { subject: string; html: string } {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};width:130px;color:${BRAND.muted};font-size:13px;letter-spacing:0.3px;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid ${BRAND.border};color:${BRAND.brown};font-size:14px;font-weight:600;">${value || "&mdash;"}</td>
    </tr>`;

  const inner = `
    <h1 style="font-family:Georgia,serif;color:${BRAND.brown};font-size:24px;font-weight:900;margin:0 0 6px;line-height:1.25;">
      New quote request
    </h1>
    <p style="margin:0 0 20px;font-size:14px;color:${BRAND.muted};">
      ${escapeHtml(args.eventType)} for ${escapeHtml(args.guestCount)} guests
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${row("Name", escapeHtml(args.name))}
      ${row("Email", `<a href="mailto:${escapeHtml(args.email)}" style="color:${BRAND.caramel};text-decoration:none;">${escapeHtml(args.email)}</a>`)}
      ${row("Phone", args.phone ? `<a href="tel:${escapeHtml(args.phone)}" style="color:${BRAND.caramel};text-decoration:none;">${escapeHtml(args.phone)}</a>` : "")}
      ${row("Event", escapeHtml(args.eventType))}
      ${row("Guests", escapeHtml(args.guestCount))}
      ${row("Date", escapeHtml(args.date || ""))}
    </table>

    ${
      args.message
        ? `
      <div style="margin-top:22px;">
        <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.muted};font-weight:700;margin-bottom:8px;">Message</div>
        <div style="background:${BRAND.beige};border:1px solid ${BRAND.border};border-radius:10px;padding:16px;font-size:14px;line-height:1.6;color:${BRAND.text};white-space:pre-wrap;">${escapeHtml(args.message)}</div>
      </div>`
        : ""
    }

    <div style="text-align:center;margin-top:28px;">
      ${button(`mailto:${args.email}?subject=Re: your Jungle Flavorz quote`, "Reply to client")}
    </div>
  `;

  return {
    subject: `New Quote: ${args.eventType} for ${args.guestCount} (${args.name})`,
    html: shell({
      preheader: `${args.name} — ${args.eventType} for ${args.guestCount} guests${args.date ? ` on ${args.date}` : ""}.`,
      eyebrow: "New Lead",
      inner,
    }),
  };
}

// -------------------------------------------------------------------------
// 3. Invoice — sent to the client
// -------------------------------------------------------------------------
export function invoiceClientEmail(args: {
  clientName: string;
  description: string;
  amountCents: number;
  currency: string;
  payUrl: string;
}): { subject: string; html: string } {
  const total = formatAmount(args.amountCents, args.currency);
  const firstName = args.clientName.split(" ")[0] || args.clientName;

  const inner = `
    <h1 style="font-family:Georgia,serif;color:${BRAND.brown};font-size:26px;font-weight:900;margin:0 0 10px;line-height:1.25;">
      Hi ${escapeHtml(firstName)} — your invoice is ready.
    </h1>
    <p style="margin:0 0 22px;font-size:15px;line-height:1.65;color:${BRAND.text};">
      Thank you for choosing Jungle Flavorz. The details are below — paying is one click and fully secured by Stripe.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${BRAND.beige};border:1px solid ${BRAND.border};border-radius:12px;margin:0 0 24px;">
      <tr>
        <td style="padding:20px 22px 8px;">
          <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.muted};font-weight:700;margin-bottom:6px;">Description</div>
          <div style="font-size:15px;color:${BRAND.brown};line-height:1.5;">${escapeHtml(args.description)}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:14px 22px 20px;border-top:1px dashed ${BRAND.border};">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${BRAND.muted};font-weight:700;">Total Due</td>
              <td align="right" style="font-family:Georgia,serif;font-size:28px;font-weight:900;color:${BRAND.brown};">${total}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <div style="text-align:center;margin:8px 0 18px;">
      ${button(args.payUrl, "Pay Securely Now")}
    </div>

    <p style="margin:0 0 6px;font-size:12px;color:${BRAND.muted};text-align:center;">
      Or paste this link into your browser:
    </p>
    <p style="margin:0 0 24px;font-size:12px;color:${BRAND.caramel};text-align:center;word-break:break-all;">
      <a href="${args.payUrl}" style="color:${BRAND.caramel};text-decoration:underline;">${args.payUrl}</a>
    </p>

    <div style="border-top:1px solid ${BRAND.border};padding-top:20px;margin-top:8px;">
      <p style="margin:0 0 4px;font-size:13px;color:${BRAND.muted};">Questions about this invoice?</p>
      <p style="margin:0;font-size:14px;color:${BRAND.text};">
        Reply to this email or call
        <a href="tel:+17373411905" style="color:${BRAND.caramel};text-decoration:none;font-weight:700;">737-341-1905</a>.
      </p>
    </div>

    <p style="margin:28px 0 0;font-size:15px;color:${BRAND.text};">
      With love,<br/>
      <strong style="font-family:Georgia,serif;color:${BRAND.brown};">Chef Linda</strong><br/>
      <span style="color:${BRAND.muted};font-size:13px;">Jungle Flavorz</span>
    </p>
  `;

  return {
    subject: `Invoice from Jungle Flavorz — ${total}`,
    html: shell({
      preheader: `Your Jungle Flavorz invoice for ${total} is ready to pay.`,
      eyebrow: "Invoice",
      inner,
      footerNote: "Payments processed securely by Stripe.",
    }),
  };
}
