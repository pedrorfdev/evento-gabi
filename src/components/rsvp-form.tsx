import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Send, Loader2, CheckCircle2, XCircle, Users, MessageSquare } from 'lucide-react'
import { z } from 'zod'
import { clsx } from 'clsx'
import { event } from '../data/event'
import { errorShake, successScale, focusLineTransition, labelSwap, rotateInfinite } from '../lib/motion'

// ─── Schema Zod ──────────────────────────────────────────────────────────────
const rsvpSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome muito curto')
    .max(80, 'Nome muito longo')
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Nome inválido'),
  attending: z.enum(['sim', 'nao'], { message: 'Escolha uma opção' }),
  guests: z.coerce
    .number()
    .int()
    .min(1, 'Mínimo 1')
    .max(10, 'Máximo 10'),
  note: z.string().max(300, 'Máximo 300 caracteres').optional(),
})

type FormData = z.infer<typeof rsvpSchema>
type FormErrors = Partial<Record<keyof FormData, string>>
type Status = 'idle' | 'loading' | 'success' | 'error'

// ─── Componente de campo individual ──────────────────────────────────────────
function Field({
  label,
  error,
  children,
  shake = false,
}: {
  label: string
  error?: string
  children: React.ReactNode
  shake?: boolean
}) {
  return (
    <motion.div
      className="flex flex-col gap-2"
      variants={errorShake}
      animate={shake && error ? 'shake' : 'idle'}
    >
      <label
        className="font-body uppercase"
        style={{ fontSize: '10px', letterSpacing: '0.22em', color: 'var(--color-text-faint)' }}
      >
        {label}
      </label>
      {children}
      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            key={error}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="font-body"
            style={{ fontSize: '12px', color: 'var(--color-pink-deep)' }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Input base estilizado ────────────────────────────────────────────────────
const inputBase: React.CSSProperties = {
  width: '100%',
  background: 'var(--color-surface)',
  border: '1px solid var(--color-border)',
  borderRadius: '0.75rem',
  padding: '0.75rem 1rem',
  fontFamily: 'var(--font-body)',
  fontSize: '14px',
  color: 'var(--color-text-primary)',
  outline: 'none',
  transition: 'border-color 0.2s ease',
}

// ─── Linha de foco animada ────────────────────────────────────────────────────
function FocusLine({ focused }: { focused: boolean }) {
  return (
    <motion.div
      style={{
        height: '1px',
        background: 'var(--color-pink)',
        originX: 0,
      }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: focused ? 1 : 0 }}
      transition={focusLineTransition}
    />
  )
}

// ─── Estado de sucesso ────────────────────────────────────────────────────────
function SuccessState() {
  return (
    <motion.div
      key="success"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={successScale.message}
      className="flex flex-col items-center gap-6 py-8 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 14 }}
      >
        <CheckCircle2 size={48} style={{ color: 'var(--color-pink)' }} />
      </motion.div>
      <div className="flex flex-col gap-2">
        <h3
          className="font-display font-light"
          style={{ fontSize: '1.8rem', color: 'var(--color-text-primary)' }}
        >
          {event.rsvpSection.successTitle}
        </h3>
        <p
          className="font-body leading-relaxed"
          style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}
        >
          {event.rsvpSection.successDescription}
        </p>
      </div>
    </motion.div>
  )
}

// ─── Estado de erro de rede ───────────────────────────────────────────────────
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <motion.div
      key="error"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-4 py-6 text-center"
    >
      <XCircle size={36} style={{ color: 'var(--color-pink-deep)' }} />
      <p
        className="font-body"
        style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}
      >
        {event.rsvpSection.errorMessage}
      </p>
      <motion.button
        onClick={onRetry}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="rounded-full border px-5 py-2 font-body text-xs uppercase tracking-widest cursor-pointer"
        style={{
          borderColor: 'var(--color-border-md)',
          color: 'var(--color-text-muted)',
          background: 'transparent',
        }}
      >
        Tentar novamente
      </motion.button>
    </motion.div>
  )
}

// ─── Form principal ───────────────────────────────────────────────────────────
export function RsvpForm() {
  const [form, setForm] = useState<Partial<FormData>>({ guests: 1 })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [submitAttempted, setSubmitAttempted] = useState(false)

  const set = (key: keyof FormData, value: unknown) => {
    setForm(prev => ({ ...prev, [key]: value }))
    // Limpa erro do campo assim que o usuário edita
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: undefined }))
  }

  const validate = (): boolean => {
    const result = rsvpSchema.safeParse(form)
    if (result.success) {
      setErrors({})
      return true
    }
    const fieldErrors: FormErrors = {}
    result.error.issues.forEach(issue => {
      const key = issue.path[0] as keyof FormData
      if (!fieldErrors[key]) fieldErrors[key] = issue.message
    })
    setErrors(fieldErrors)
    return false
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitAttempted(true)

    if (!validate()) return

    setStatus('loading')
    try {
      const scriptUrl = event.rsvp.scriptUrl
      if (!scriptUrl) throw new Error('scriptUrl não configurada')

      await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        mode: 'no-cors',
      })

      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  // Attending options
  const attendingOptions = [
    { value: 'sim', label: '✓  Vou estar lá' },
    { value: 'nao', label: '✗  Não vou conseguir' },
  ]

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <SuccessState key="success" />
        ) : status === 'error' ? (
          <ErrorState key="error" onRetry={() => setStatus('idle')} />
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={successScale.form}
            className="flex flex-col gap-6"
            noValidate
          >
            {/* Nome */}
            <Field label="Seu nome completo" error={errors.name} shake={submitAttempted}>
              <div className="flex flex-col gap-0.5">
                <input
                  type="text"
                  placeholder="Como você se chama?"
                  value={form.name ?? ''}
                  onChange={e => set('name', e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  style={{
                    ...inputBase,
                    borderColor: errors.name
                      ? 'var(--color-pink-deep)'
                      : focusedField === 'name'
                        ? 'var(--color-border-md)'
                        : 'var(--color-border)',
                  }}
                />
                <FocusLine focused={focusedField === 'name'} />
              </div>
            </Field>

            {/* Confirmação */}
            <Field label="Você vai comparecer?" error={errors.attending} shake={submitAttempted}>
              <div className="grid grid-cols-2 gap-2">
                {attendingOptions.map(opt => (
                  <motion.button
                    key={opt.value}
                    type="button"
                    onClick={() => set('attending', opt.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="rounded-xl border py-3 font-body text-xs uppercase tracking-wider cursor-pointer transition-all duration-200"
                    style={{
                      borderColor:
                        form.attending === opt.value
                          ? 'var(--color-pink)'
                          : errors.attending
                            ? 'var(--color-pink-deep)'
                            : 'var(--color-border)',
                      background:
                        form.attending === opt.value
                          ? 'color-mix(in srgb, var(--color-pink) 10%, transparent)'
                          : 'var(--color-surface)',
                      color:
                        form.attending === opt.value
                          ? 'var(--color-pink)'
                          : 'var(--color-text-muted)',
                    }}
                  >
                    {opt.label}
                  </motion.button>
                ))}
              </div>
            </Field>

            {/* Acompanhantes — só aparece se confirmou presença */}
            <AnimatePresence>
              {form.attending === 'sim' && (
                <motion.div
                  key="guests"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  style={{ overflow: 'hidden' }}
                >
                  <Field
                    label="Quantas pessoas (incluindo você)?"
                    error={errors.guests}
                    shake={submitAttempted}
                  >
                    <div className="flex items-center gap-3">
                      <Users size={16} style={{ color: 'var(--color-text-faint)', flexShrink: 0 }} />
                      <div className="flex items-center border rounded-xl overflow-hidden" style={{ borderColor: 'var(--color-border)' }}>
                        {[1, 2, 3, 4, 5].map(n => (
                          <motion.button
                            key={n}
                            type="button"
                            onClick={() => set('guests', n)}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 font-body text-sm cursor-pointer transition-all duration-150 flex-shrink-0"
                            style={{
                              background: form.guests === n
                                ? 'var(--color-pink)'
                                : 'var(--color-surface)',
                              color: form.guests === n
                                ? 'var(--color-bg)'
                                : 'var(--color-text-muted)',
                              borderRight: n < 5 ? '1px solid var(--color-border)' : undefined,
                            }}
                          >
                            {n}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </Field>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Observação */}
            <Field label="Alguma observação? (opcional)" error={errors.note}>
              <div className="flex flex-col gap-0.5">
                <div className="relative">
                  <MessageSquare
                    size={14}
                    className="absolute left-3 top-3.5 pointer-events-none"
                    style={{ color: 'var(--color-text-faint)' }}
                  />
                  <textarea
                    placeholder="Restrição alimentar, dúvida, recado..."
                    value={form.note ?? ''}
                    onChange={e => set('note', e.target.value)}
                    onFocus={() => setFocusedField('note')}
                    onBlur={() => setFocusedField(null)}
                    rows={3}
                    style={{
                      ...inputBase,
                      paddingLeft: '2rem',
                      resize: 'none',
                      borderColor: focusedField === 'note'
                        ? 'var(--color-border-md)'
                        : 'var(--color-border)',
                    }}
                  />
                </div>
                <FocusLine focused={focusedField === 'note'} />
                <p
                  className="font-body self-end"
                  style={{ fontSize: '11px', color: 'var(--color-text-faint)' }}
                >
                  {(form.note?.length ?? 0)}/300
                </p>
              </div>
            </Field>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={status === 'loading'}
              whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
              whileTap={status !== 'loading' ? { scale: 0.97 } : {}}
              className={clsx(
                'btn-premium inline-flex min-h-12 w-full items-center justify-center gap-2',
                'rounded-full font-body text-xs uppercase tracking-widest',
                'transition-opacity duration-200',
                status === 'loading' && 'opacity-70 cursor-not-allowed'
              )}
            >
              <AnimatePresence mode="wait">
                {status === 'loading' ? (
                  <motion.span
                    key="loading"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={labelSwap}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      animate={rotateInfinite.animate}
                      transition={rotateInfinite.transition}
                    >
                      <Loader2 size={15} />
                    </motion.div>
                    Enviando...
                  </motion.span>
                ) : (
                  <motion.span
                    key="send"
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={labelSwap}
                    className="flex items-center gap-2"
                  >
                    <Send size={15} />
                    {event.rsvpSection.primaryLabel}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}