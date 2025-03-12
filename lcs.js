with(console){p=process;(s=p.argv.slice(2))[0]||p.exit();A=s[0];for(l=A.length+1;--l;)for(i=0;i<=A.length-l;i++)s.every(x=>x.includes(t=A.slice(i,i+l)))&&(log(t),p.exit())}
