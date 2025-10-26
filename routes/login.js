const express = require('express')
const router = express.Router()
const user = require('../models/user')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.render('auth') 
})

router.post('/login', async (req, res) => {
    const { loginEmail, loginPassword } = req.body

    if (!loginEmail || !loginPassword) {
        req.flash('error_msg', 'Preencha todos os campos')
        return res.redirect('/auth')
    }

    try {
         const existingUser = await user.findOne({ where: { email: loginEmail } })
        if (!existingUser) {
            req.flash('error_msg', 'Usuário não encontrado')
            return res.redirect('/auth')
        }

        const passwordValid = await bcrypt.compare(loginPassword, existingUser.password)
        if (!passwordValid) {
            req.flash('error_msg', 'Senha incorreta')
            return res.redirect('/auth')
        }

        const plainUser = existingUser.toJSON()
        req.flash('success_msg', 'Login realizado com sucesso')
        req.session.user =  plainUser
        res.render('profile', { user:  plainUser })
    } catch (err) {
        console.error(err)
        req.flash('error_msg', 'Erro ao fazer login, tente novamente')
        res.redirect('/auth')
    }
})

router.get(`/logout`, (req, res) => {
    req.session.destroy((err) => {
        if(err) {
           
            req.flash(`success_msg`, `Você saiu da sua conta com sucesso!`);

            console.error(err);
            req.flash(`error_msg`, `Erro ao tentar sair, tente novamente`);
            return res.redirect(`/profile`)
        }
        res.clearCookie(`connect.sid`);
        res.redirect(`/auth`);
    });
});


router.post('/register', async (req, res) => {
    const { name, registerEmail, registerPassword } = req.body

    if (!name || !registerEmail || !registerPassword) {
        req.flash('error_msg', 'Preencha todos os campos')
        return res.redirect('/auth')
    }

    try {
        const hashedPassword = await bcrypt.hash(registerPassword, 10)
        await user.create({
            name: name,
            email: registerEmail,
            password: hashedPassword
        })
        req.flash('success_msg', `Parabéns ${name}, cadastro realizado com sucesso!`)
        res.redirect('/auth')
    } catch (err) {
        console.error(err)
        req.flash('error_msg', 'Erro ao cadastrar, tente novamente')
        res.redirect('/auth')
    }
})

module.exports = router