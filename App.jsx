import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  Plus,
  Calendar,
  LayoutDashboard,
  AlertCircle,
  FileText,
  Trash2,
  Maximize2
} from 'lucide-react';

// Dados Iniciais
const initialTasks = [
  { id: 't1', process: '60201047120254063801', link: 'https://juizdefora.spa.coreplan.com.br/judicial_processes/60201047120254063801/documents?soap_setting_id=17', date: '01/06', type: 'Geral', status: 'todo' },
  { id: 't2', process: '50148349620248130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2868544', date: '01/06', type: 'Geral', status: 'todo' },
  { id: 't3', process: '10053072320268130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2891747', date: '01/06', type: 'Geral', status: 'todo' },
  { id: 't4', process: '10001316320268130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2889711', date: '01/06', type: 'Geral', status: 'todo' },
  { id: 't5', process: '10109733120234063801', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2843342', date: '01/06', type: 'Geral', status: 'todo' },
  { id: 't6', process: '50156354620238130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2836583', date: '01/06', type: 'Geral', status: 'todo' },
  { id: 't7', process: '10034417720268130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2891136', date: '01/06', type: 'Geral', status: 'todo' },
  { id: 't8', process: '10034711520268130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2891084', date: '01/06', type: 'Manifestação', status: 'todo' },
  { id: 't9', process: '50207221220258130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2874765', date: '01/06', type: 'Manifestação', status: 'todo' },
  { id: 't10', process: '50148597520258130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2872746', date: '01/06', type: 'Manifestação', status: 'todo' },
  { id: 't11', process: '50145765720228130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2808390', date: '01/06', type: 'Manifestação', status: 'todo' },
  { id: 't12', process: '50350391520258130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2885261', date: '01/06', type: 'Manifestação', status: 'todo' },
  { id: 't13', process: '50187651020248130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2874217', date: '01/06', type: 'Manifestação', status: 'todo' },
  { id: 't14', process: '10003501320258130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2882969', date: '02/06', type: 'Geral', status: 'todo' },
  { id: 't15', process: '10048006220268130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2891578', date: '02/06', type: 'Geral', status: 'todo' },
  { id: 't16', process: '10075650620268130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2892418', date: '02/06', type: 'Geral', status: 'todo' },
  { id: 't17', process: '50009711520208130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2707587', date: '02/06', type: 'Geral', status: 'todo' },
  { id: 't18', process: '03323470720158130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2661062', date: '02/06', type: 'Geral', status: 'todo' },
  { id: 't19', process: '50156354620238130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2836583', date: '02/06', type: 'Geral', status: 'todo' },
  { id: 't20', process: '50099424720248130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2855445', date: '02/06', type: 'Geral', status: 'todo' },
  { id: 't21', process: '50529224320238130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2851149', date: '02/06', type: 'Geral', status: 'todo' },
  { id: 't22', process: '20038403920268130000', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2891262', date: '02/06', type: 'Geral', status: 'todo' },
  { id: 't23', process: '50514723120248130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2875081', date: '02/06', type: 'Geral', status: 'todo' },
  { id: 't24', process: '50456713720248130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2866245', date: '02/06', type: 'Geral', status: 'todo' },
  { id: 't25', process: '10012627320268130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2890354', date: '02/06', type: 'Geral', status: 'todo' },
  { id: 't26', process: '10043468220268130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2891445', date: '03/06', type: 'Citação', status: 'todo' },
  { id: 't27', process: '25664800320138130024', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2785965', date: '03/06', type: 'Manifestação', status: 'todo' },
  { id: 't28', process: '10039389120268130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2891334', date: '03/06', type: 'Citação', status: 'todo' },
  { id: 't29', process: '50067399220158130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2666340', date: '03/06', type: 'Manifestação', status: 'todo' },
  { id: 't30', process: '10056813920268130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2891841', date: '03/06', type: 'Citação', status: 'todo' },
  { id: 't31', process: '01798691920128130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2622653', date: '04/06', type: 'Geral', status: 'todo' },
  { id: 't32', process: '10035580520258130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2885379', date: '04/06', type: 'Geral', status: 'todo' },
  { id: 't33', process: '10021559820258130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2884940', date: '04/06', type: 'Geral', status: 'todo' },
  { id: 't34', process: '50167746220258130145', link: 'https://juizdefora.spa.coreplan.com.br/procedures/2873348', date: '05/06', type: 'Geral', status: 'todo' },
];

const COLUMNS = [
  { id: 'todo', title: 'A Fazer', color: 'bg-slate-100', headerColor: 'bg-slate-200 text-slate-700' },
  { id: 'doing', title: 'Em Andamento', color: 'bg-blue-50', headerColor: 'bg-blue-200 text-blue-800' },
  { id: 'done', title: 'Concluído', color: 'bg-green-50', headerColor: 'bg-green-200 text-green-800' }
];

const formatCNJ = (number) => {
  const clean = number.replace(/\D/g, '');
  if (clean.length === 20) {
    return clean.replace(/^(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})$/, "$1-$2.$3.$4.$5.$6");
  }
  return number;
};

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('kanban-tasks-v2');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [activeIframe, setActiveIframe] = useState(null);
  const [selectedDate, setSelectedDate] = useState('01/06');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);

  const [newTask, setNewTask] = useState({
    process: '',
    link: '',
    type: 'Geral',
    date: selectedDate
  });

  const availableDates = [...new Set(tasks.map(t => t.date))].sort();

  useEffect(() => {
    localStorage.setItem('kanban-tasks-v2', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    setNewTask(prev => ({ ...prev, date: selectedDate }));
  }, [selectedDate]);

  const handleDragStart = (e, task) => {
    setDraggedItem(task);
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => {
      e.target.style.opacity = '0.5';
    }, 0);
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    if (!draggedItem) return;

    if (draggedItem.status !== targetStatus) {
      setTasks(prev => prev.map(t =>
        t.id === draggedItem.id ? { ...t, status: targetStatus } : t
      ));
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.process || !newTask.link) return;

    const taskToAdd = {
      ...newTask,
      id: `new-${Date.now()}`,
      status: 'todo'
    };

    setTasks(prev => [...prev, taskToAdd]);
    setIsModalOpen(false);
    setNewTask({ process: '', link: '', type: 'Geral', date: selectedDate });

    if (newTask.date !== selectedDate) {
        setSelectedDate(newTask.date);
    }
  };

  const deleteTask = (id, e) => {
    e.stopPropagation();
    if(window.confirm('Tem certeza que deseja remover este prazo?')) {
      setTasks(prev => prev.filter(t => t.id !== id));
      if(activeIframe?.id === id) setActiveIframe(null);
    }
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case 'Manifestação': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Citação': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    }
  };

  const filteredTasks = tasks.filter(t => t.date === selectedDate);
  const totalTasks = filteredTasks.length;
  const completedTasks = filteredTasks.filter(t => t.status === 'done').length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">

      {/* Área Principal - Kanban */}
      <div className={`flex flex-col h-full transition-all duration-300 ease-in-out ${activeIframe ? 'w-1/2 border-r border-slate-300 shadow-xl z-10' : 'w-full'}`}>

        {/* Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 text-white rounded-lg">
              <LayoutDashboard size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800">Meus Prazos</h1>
              <p className="text-sm text-slate-500 flex items-center gap-1">
                <Calendar size={14} /> Semana de 01/06 a 05/06
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-xs font-semibold text-slate-500 mb-1">Progresso Diário ({progress}%)</span>
              <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => {
                if(window.confirm('Isso apagará todas as tarefas atuais e voltará ao padrão original. Continuar?')) {
                  setTasks(initialTasks);
                  setActiveIframe(null);
                }
              }}
              className="text-xs text-slate-400 hover:text-red-500 transition-colors underline"
            >
              Resetar Padrão
            </button>
          </div>
        </header>

        {/* Abas de Dias e Botão Adicionar */}
        <div className="bg-white px-6 py-2 border-b border-slate-200 flex items-center justify-between overflow-x-auto">
          <div className="flex gap-2">
            {availableDates.map(date => (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  selectedDate === date
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                Dia {date}
                <span className="ml-2 text-xs opacity-70 bg-white px-1.5 py-0.5 rounded-full border border-slate-200">
                  {tasks.filter(t => t.date === date).length}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm whitespace-nowrap ml-4"
          >
            <Plus size={16} />
            Novo Prazo
          </button>
        </div>

        {/* Board do Kanban */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden p-6">
          <div className="flex h-full gap-6 min-w-min">
            {COLUMNS.map(column => (
              <div
                key={column.id}
                className={`flex flex-col w-80 shrink-0 rounded-xl border border-slate-200 overflow-hidden ${column.color}`}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                {/* Cabeçalho da Coluna */}
                <div className={`px-4 py-3 border-b border-slate-200/50 flex justify-between items-center ${column.headerColor}`}>
                  <h2 className="font-semibold">{column.title}</h2>
                  <span className="bg-white/50 px-2 py-0.5 rounded-full text-xs font-bold">
                    {filteredTasks.filter(t => t.status === column.id).length}
                  </span>
                </div>

                {/* Lista de Cards */}
                <div className="flex-1 p-3 overflow-y-auto space-y-3">
                  {filteredTasks
                    .filter(t => t.status === column.id)
                    .map(task => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task)}
                        onDragEnd={handleDragEnd}
                        className={`bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing group ${activeIframe?.id === task.id ? 'ring-2 ring-indigo-500' : ''}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className={`px-2 py-1 text-xs font-semibold rounded border ${getBadgeColor(task.type)}`}>
                            {task.type}
                          </span>
                          <button
                            onClick={(e) => deleteTask(task.id, e)}
                            className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remover prazo"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>

                        <div className="flex items-start gap-2 mb-4">
                          <FileText size={16} className="text-slate-400 mt-1 shrink-0" />
                          <p className="font-mono text-sm text-slate-700 font-medium break-all">
                            {formatCNJ(task.process)}
                          </p>
                        </div>

                        <div className="flex gap-2">
                          <button
                            onClick={() => setActiveIframe(task)}
                            className={`flex-1 flex justify-center items-center gap-1.5 px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                              activeIframe?.id === task.id
                                ? 'bg-indigo-100 text-indigo-700'
                                : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                            }`}
                          >
                            <Maximize2 size={14} />
                            Painel
                          </button>

                          <a
                            href={task.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center p-1.5 rounded bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-indigo-600 border border-slate-200 transition-colors"
                            title="Abrir em nova aba"
                          >
                            <ExternalLink size={16} />
                          </a>
                        </div>
                      </div>
                  ))}

                  {filteredTasks.filter(t => t.status === column.id).length === 0 && (
                    <div className="h-24 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center text-slate-400 text-sm">
                      Solte aqui
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Painel do Iframe (Split Screen) */}
      {activeIframe && (
        <div className="w-1/2 h-full bg-slate-100 flex flex-col relative z-0 animate-in slide-in-from-right duration-300">

          {/* Header do Iframe */}
          <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between shrink-0">
            <div>
              <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                <FileText size={16} className="text-indigo-600" />
                Processo {formatCNJ(activeIframe.process)}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  Dia {activeIframe.date}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded ${getBadgeColor(activeIframe.type).replace('border', '')}`}>
                  {activeIframe.type}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={activeIframe.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-3 py-1.5 rounded-md transition-colors"
              >
                <ExternalLink size={14} />
                Abrir Externo
              </a>
              <button
                onClick={() => setActiveIframe(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                title="Fechar painel"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Aviso de Bloqueio de Iframe */}
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-start gap-2 text-sm text-amber-800 shrink-0">
            <AlertCircle size={16} className="mt-0.5 shrink-0 text-amber-600" />
            <p>
              Se a página abaixo ficar em branco ou recusar a conexão, o sistema do tribunal bloqueia iframes por segurança (X-Frame-Options).
              Neste caso, use o botão <strong>"Abrir Externo"</strong> acima.
            </p>
          </div>

          {/* O Iframe em si */}
          <div className="flex-1 relative bg-white">
            <iframe
              src={activeIframe.link}
              className="absolute inset-0 w-full h-full border-0"
              title={`Processo ${activeIframe.process}`}
              sandbox="allow-same-origin allow-scripts allow-forms"
            />
          </div>
        </div>
      )}

      {/* Modal de Adicionar Tarefa */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-800">Adicionar Novo Prazo</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Dia do Prazo</label>
                <select
                  value={newTask.date}
                  onChange={(e) => setNewTask({...newTask, date: e.target.value})}
                  className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                >
                  {availableDates.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                  <option value="06/06">06/06 (Novo dia)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Número do Processo</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: 10043468220268130145"
                  value={newTask.process}
                  onChange={(e) => setNewTask({...newTask, process: e.target.value})}
                  className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Link do Coreplan</label>
                <input
                  type="url"
                  required
                  placeholder="https://juizdefora.spa.coreplan.com.br/..."
                  value={newTask.link}
                  onChange={(e) => setNewTask({...newTask, link: e.target.value})}
                  className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Tarefa</label>
                <select
                  value={newTask.type}
                  onChange={(e) => setNewTask({...newTask, type: e.target.value})}
                  className="w-full border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                >
                  <option value="Geral">Geral</option>
                  <option value="Manifestação">Manifestação</option>
                  <option value="Citação">Citação</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-300 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  Salvar Tarefa
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
