p=process;a=p.argv.slice(2);a[0]||p.exit();s=a[0];for(l=s.length;l;l--)for(i=0;i+l<=s.length;i++)a.every(x=>x.includes(t=s.slice(i,i+l)))&&(console.log(t),p.exit())