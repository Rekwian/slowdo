export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { sendMail } = useNodeMailer()


  return sendMail({
    from: body.email,
    subject: `[Slowdo] ${body.pattern}`,
    text: body.message,
    to: 'team@rellyk.com'
  })
})
