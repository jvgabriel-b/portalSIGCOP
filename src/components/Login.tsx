import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Lock, Mail, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const { signIn, signUp } = useAuth();

  // Validação de email em tempo real
  const validateEmail = (value: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(!isValid && value ? 'Email inválido' : '');
  };

  // Calcular força da senha
  const getPasswordStrength = () => {
    if (!password) return { level: 0, label: '', color: 'bg-gray-300' };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { level: 0, label: '', color: 'bg-gray-300' },
      { level: 1, label: 'Fraca', color: 'bg-blue-500' },
      { level: 2, label: 'Média', color: 'bg-yellow-500' },
      { level: 3, label: 'Forte', color: 'bg-green-500' },
      { level: 4, label: 'Muito Forte', color: 'bg-green-600' }
    ];
    return levels[strength];
  };

  const passwordStrength = getPasswordStrength();
  const isEmailValid = !emailError && email;
  const isPasswordValid = password.length >= 6;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (emailError || !isEmailValid) {
      setError('Por favor, verifique seu email');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
      } else {
        if (!fullName.trim()) throw new Error('Nome completo é obrigatório');
        if (!organization.trim()) throw new Error('Organização é obrigatória');
        const { error } = await signUp(email, password, fullName, organization);
        if (error) throw error;
      }
    } catch (err: unknown) {
      setError((err as Error).message || 'Ocorreu um erro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setError('');
    setEmailError('');
  };

  return (
    <div className="min-h-screen flex">
      {/* Painel Esquerdo - Azul Escuro Laminado Charmoso */}
      <div className="hidden lg:flex flex-col justify-center items-start w-1/2 p-12 relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, #0f2a4a 0%, #1a3f6b 30%, #153456 60%, #0c1e2e 100%)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -1px 0 rgba(0,0,0,0.3)'
      }}>
        {/* Elementos decorativos - Efeito laminado */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl -ml-40 -mb-40"></div>

        <div className="relative z-10 max-w-md">
          {/* Título Principal */}
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            Gestão Centralizada de Contratos e Convênios
          </h1>

          {/* Descrição */}
          <p className="text-lg text-blue-100 mb-12 leading-relaxed">
            Plataforma completa para administração, monitoramento e transparência de contratos governamentais
          </p>

          {/* Benefícios */}
          <div className="space-y-6">
            {/* Benefício 1 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-white/20 border-2 border-white">
                  <CheckCircle2 className="h-4 w-4 text-white font-bold" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Gestão Integrada</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Ciclo completo de contratos em uma plataforma
                </p>
              </div>
            </div>

            {/* Benefício 2 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-white/20 border-2 border-white">
                  <CheckCircle2 className="h-4 w-4 text-white font-bold" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Monitoramento em Tempo Real</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Acompanhamento de cronogramas e execução
                </p>
              </div>
            </div>

            {/* Benefício 3 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-white/20 border-2 border-white">
                  <CheckCircle2 className="h-4 w-4 text-white font-bold" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Transparência Garantida</h3>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Conformidade com normas de transparência pública
                </p>
              </div>
            </div>
          </div>

          {/* Footer do painel esquerdo */}
          <div className="mt-16 pt-8 border-t border-blue-400/30">
            <p className="text-xs text-blue-200">
              © 2024 Governo do Estado de São Paulo. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>

      {/* Painel Direito - Branco com Formulário */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-white p-6 sm:p-8">
        <div className="w-full max-w-sm">
          {/* Header com Logo e Nome - Destaque */}
          <div className="mb-12 flex flex-col items-center lg:items-start gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/logoangerona1.png"
                alt="Logo Angerona"
                className="h-16 object-contain drop-shadow-lg"
              />
              <h1 className="text-5xl font-black text-black" style={{
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                letterSpacing: '-0.5px'
              }}>SIGCOP</h1>
            </div>
          </div>

          {/* Subtítulo */}
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {isLogin ? 'Acesse sua Conta' : 'Criar Nova Conta'}
            </h2>
            <p className="text-gray-600 text-sm">
              {isLogin
                ? 'Acesse sua conta com suas credenciais'
                : 'Preencha os dados para criar sua conta'}
            </p>
          </div>

          {/* Abas - Entrar / Cadastrar */}
          <div className="inline-flex bg-gray-100 p-1 rounded-xl mb-8 gap-2 w-full">
            <button
              type="button"
              onClick={() => {
                setIsLogin(true);
                handleResetForm();
              }}
              className={`flex-1 px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                isLogin
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => {
                setIsLogin(false);
                handleResetForm();
              }}
              className={`flex-1 px-6 py-2.5 rounded-lg font-semibold transition-all duration-200 ${
                !isLogin
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Cadastrar
            </button>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Campos de Cadastro */}
            {!isLogin && (
              <>
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome Completo
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="João da Silva"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="organization" className="block text-sm font-semibold text-gray-700 mb-2">
                    Organização / Órgão
                  </label>
                  <input
                    id="organization"
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Ex: Secretaria de Finanças"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>
              </>
            )}

            {/* Campo de Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                E-mail Institucional
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }}
                  onBlur={() => validateEmail(email)}
                  placeholder="seu.email@sp.gov.br"
                  className={`w-full pl-12 pr-12 py-3 bg-gray-50 border-2 rounded-lg transition-all focus:outline-none text-gray-900 placeholder-gray-500 ${
                    emailError
                      ? 'border-blue-300 focus:ring-2 focus:ring-blue-200'
                      : email && isEmailValid
                      ? 'border-green-300 focus:ring-2 focus:ring-green-200'
                      : 'border-gray-200 focus:ring-2 focus:ring-blue-200'
                  }`}
                  required
                />
                {emailError && (
                  <AlertCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" />
                )}
                {isEmailValid && email && (
                  <CheckCircle2 className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
              </div>
              {emailError && <p className="text-blue-600 text-xs mt-2 font-medium">{emailError}</p>}
            </div>

            {/* Campo de Senha */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Senha
                </label>
                {!isLogin && password && (
                  <span className="text-xs text-gray-600">
                    Força: <span
                      className={`font-semibold ${
                        passwordStrength.level === 1
                          ? 'text-blue-600'
                          : passwordStrength.level === 2
                          ? 'text-yellow-600'
                          : passwordStrength.level === 3
                          ? 'text-green-600'
                          : 'text-green-700'
                      }`}
                    >
                      {passwordStrength.label}
                    </span>
                  </span>
                )}
              </div>

              <div className="relative mb-2">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={isLogin ? 'Digite sua senha' : 'Mínimo 6 caracteres'}
                  className={`w-full pl-12 pr-12 py-3 bg-gray-50 border-2 rounded-lg transition-all focus:outline-none text-gray-900 placeholder-gray-500 ${
                    password && isPasswordValid
                      ? 'border-green-300 focus:ring-2 focus:ring-green-200'
                      : 'border-gray-200 focus:ring-2 focus:ring-blue-200'
                  }`}
                  minLength={6}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Indicador de força da senha */}
              {!isLogin && password && (
                <div className="flex gap-1.5 mb-3">
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className={`h-2 flex-1 rounded-full transition-all ${
                        level <= passwordStrength.level ? passwordStrength.color : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              )}

              {isLogin && (
                <div className="text-right">
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    Esqueceu a senha?
                  </a>
                </div>
              )}
            </div>

            {/* Mensagem de Erro */}
            {error && (
              <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 px-4 py-3 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">{error}</p>
                </div>
              </div>
            )}

            {/* Botão de Envio */}
            <button
              type="submit"
              disabled={loading || !isEmailValid}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed shadow-lg hover:shadow-xl active:shadow-md disabled:shadow-none"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Processando...
                </span>
              ) : isLogin ? (
                'Entrar na Plataforma'
              ) : (
                'Criar Minha Conta'
              )}
            </button>

            {/* Links Footer */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 text-xs text-gray-600 pt-4 border-t border-gray-200">
              <a href="#" className="hover:text-blue-600 transition-colors font-medium">
                Termos de Uso
              </a>
              <span className="hidden sm:inline">•</span>
              <a href="#" className="hover:text-blue-600 transition-colors font-medium">
                Política de Privacidade
              </a>
            </div>
          </form>
        </div>

        {/* Footer Mobile */}
        <div className="lg:hidden text-center mt-8">
          <p className="text-xs text-gray-600">
            © 2024 SIGCOP. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </div>
  );
}
